package org.ll.mspa.nav

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CrueltyFree
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Pets
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.feature.main.screen.MainScreen
import org.ll.mspa.feature.main.screen.SignInUpScreen
import org.ll.mspa.feature.pets.ui.screen.PetExplorerScreen
import org.ll.mspa.feature.virtualpet.ui.screen.VirtualPetScreen
import org.ll.mspa.nav.MspaNavKey.Main
import org.ll.mspa.nav.MspaNavKey.PetExplorer
import org.ll.mspa.nav.MspaNavKey.VirtualPet


data class BottomNavItem(val label: String,
                         val icon: ImageVector,
                         val key: String,
                         val action: (key: String  , user: UserInfo ) -> Boolean )
@Composable
fun MspaNavGraph(modifier: Modifier = Modifier) {
    // List of items for the bottom navigation bar
    fun getKey(name: String, user: UserInfo):MspaNavKey{
        return when(name){
            "Main" -> Main(user)
            "PetExplorer" -> PetExplorer(user)
            "VirtualPet" -> VirtualPet(user)
            else -> Main(user)
        }
    }
    //val backStack = rememberNavBackStack<MspaNavKey>(MspaNavKey.SignIn)
    val backStack = rememberNavBackStack(MspaNavKey.SignIn)
    val addScreen = { key: String , user: UserInfo ->
        backStack.add(getKey(key,user))
    }

    val cleanAndHome = { key: String , user: UserInfo ->
        while (backStack.size > 2) { // go back to home, keeping SignIn in the Stack
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