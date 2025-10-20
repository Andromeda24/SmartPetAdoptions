package org.ll.mspa.feature.virtualpet.ui.screen

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.nav.BottomNavItem
import org.ll.mspa.nav.MspaNavKey

@Composable
fun VirtualPetScreen(navItems: List<BottomNavItem>,
                     user: UserInfo,
                     modifier: Modifier = Modifier) {

    val mykey = "VirtualPet"
    Scaffold (
        bottomBar = {
            BottomAppBar(
                //containerColor = Color.Blue

            ) {
                navItems.forEachIndexed { index, item ->
                    NavigationBarItem(
                        selected = item.key == mykey,
                        onClick = {
                            item.action(item.key,user)
                        },
                        label = { Text(item.label) },
                        icon = {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = item.label
                            )
                        }
                    )
                }
            }
        },
    ){ innerPadding ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding).padding(horizontal =20.dp, vertical = 100.dp), // Apply padding provided by the Scaffold
            horizontalAlignment = Alignment.Start // Center the content
        ) {
            Text(
                text = "This is your virtual pet",
                textAlign = TextAlign.Justify,
                style = MaterialTheme.typography.bodyMedium,

                )
        }
    }
}
