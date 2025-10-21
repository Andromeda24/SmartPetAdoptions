package org.ll.mspa.nav

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CrueltyFree
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Pets
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import kotlinx.coroutines.flow.firstOrNull
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.local.PreferencesDataSource
import org.ll.mspa.feature.main.screen.MainScreen
import org.ll.mspa.feature.main.screen.SignInUpScreen
import org.ll.mspa.feature.pets.ui.screen.PetExplorerScreen
import org.ll.mspa.feature.virtualpet.ui.screen.VirtualPetScreen
import org.ll.mspa.nav.MspaNavKey.Main
import org.ll.mspa.nav.MspaNavKey.PetExplorer
import org.ll.mspa.nav.MspaNavKey.VirtualPet
import org.ll.mspa.service.LocalAuthenticationRepositoryImpl


data class BottomNavItem(val label: String,
                         val icon: ImageVector,
                         val key: String,
                         val action: (key: String  , user: UserInfo ) -> Boolean )


@Composable
fun MspaNavGraph(modifier: Modifier = Modifier) {
    // retrieve authentication data if available in Datastore

    val context = LocalContext.current
    val backStack = rememberNavBackStack(MspaNavKey.SignIn)

    LaunchedEffect(Unit) {
        val preferenceDataStore = PreferencesDataSource(context)
        val localAuthenticationRepository = LocalAuthenticationRepositoryImpl(preferenceDataStore)

        // just for testing ... delete the existing user before checking it
        localAuthenticationRepository.deleteAuthenticatedUser()
        val userFlow = localAuthenticationRepository.retrieveAuthenticatedUser()
        val user = userFlow.firstOrNull()
        if (user == null){
            backStack.add(MspaNavKey.SignIn )

        } else {
            backStack.add( MspaNavKey.Main(user))
        }

    }


    // List of items for the bottom navigation bar
    fun getKey(name: String, user: UserInfo):MspaNavKey{
        return when(name){
            "Main" -> Main(user)
            "PetExplorer" -> PetExplorer(user)
            "VirtualPet" -> VirtualPet(user)
            else -> Main(user)
        }
    }


    val addScreen = { key: String , user: UserInfo ->
        backStack.add(getKey(key,user))
    }

    val cleanAndHome = { key: String , user: UserInfo ->
        while (backStack.size > 1) { // go back to home
            backStack.removeLastOrNull()
        }
        true
    }
    val navItems = listOf(
        BottomNavItem("Home", Icons.Default.Home, "Main", cleanAndHome ),
        BottomNavItem("Explore Pets", Icons.Default.Pets, "PetExplorer", addScreen),
        BottomNavItem("My Virtual Pet", Icons.Default.CrueltyFree, "VirtualPet", addScreen),
    )



    NavDisplay(


        modifier = modifier,
        backStack = backStack,
        onBack = { backStack.removeLastOrNull()},
        entryProvider = entryProvider {
            entry<MspaNavKey.SignIn> {
                SignInUpScreen(modifier ,
                onLogin = {user: UserInfo ->
                    backStack.add(MspaNavKey.Main(user))

                })
            }
            entry<MspaNavKey.Main> {
                MainScreen(navItems,it.user)
            }

            entry<MspaNavKey.PetExplorer> {
                PetExplorerScreen(navItems,it.user)
            }
            entry<MspaNavKey.VirtualPet> {
                VirtualPetScreen(navItems,it.user)
            }
        }
    )
}