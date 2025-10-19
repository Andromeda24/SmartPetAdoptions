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
import org.ll.mspa.feature.main.screen.MainScreen
import org.ll.mspa.feature.main.screen.SignInUpScreen
import org.ll.mspa.feature.pets.ui.screen.PetExplorerScreen
import org.ll.mspa.feature.virtualpet.ui.screen.VirtualPetScreen



data class BottomNavItem(val label: String,
                         val icon: ImageVector,
                         val key: MspaNavKey,
                         val action: (key: MspaNavKey  ) -> Boolean )
@Composable
fun MspaNavGraph(modifier: Modifier = Modifier) {
    // List of items for the bottom navigation bar

    //val backStack = rememberNavBackStack<MspaNavKey>(MspaNavKey.SignIn)
    val backStack = rememberNavBackStack(MspaNavKey.SignIn)
    val addScreen = { key: MspaNavKey ->
        backStack.add(key)
    }

    val cleanAndHome = { key: MspaNavKey ->
        while (backStack.size > 2) { // go back to home, keeping SignIn in the Stack
            backStack.removeLastOrNull()
        }
        true
    }
    val navItems = listOf(
        BottomNavItem("Home", Icons.Default.Home, MspaNavKey.Main, cleanAndHome ),
        BottomNavItem("Explore Pets", Icons.Default.Pets, MspaNavKey.PetExplorer, addScreen),
        BottomNavItem("My Virtual Pet", Icons.Default.CrueltyFree, MspaNavKey.VirtualPet, addScreen),
    )
    NavDisplay(
        modifier = modifier,
        backStack = backStack,
        onBack = { backStack.removeLastOrNull()},
        entryProvider = entryProvider {
            entry<MspaNavKey.SignIn> {
                SignInUpScreen(modifier ,
                onLogin = {
                    backStack.add(MspaNavKey.Main)

                })
            }
            entry<MspaNavKey.Main> {
                MainScreen(navItems)
            }

            entry<MspaNavKey.PetExplorer> {
                PetExplorerScreen(navItems)
            }
            entry<MspaNavKey.VirtualPet> {
                VirtualPetScreen(navItems)
            }
        }
    )
}