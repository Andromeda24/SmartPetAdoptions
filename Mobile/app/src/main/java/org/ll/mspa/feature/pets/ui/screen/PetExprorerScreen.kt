package org.ll.mspa.feature.pets.ui.screen

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
import org.ll.mspa.nav.BottomNavItem

@Composable
fun PetExplorerScreen(navItems: List<BottomNavItem>, modifier: Modifier = Modifier) {
    Scaffold (
        bottomBar = {
            BottomAppBar(
                //containerColor = Color.Blue

            ) {
                navItems.forEachIndexed { index, item ->
                    NavigationBarItem(
                        selected = false,
                        onClick = {
                            // selectedItemIndex = index
                            // You can add navigation logic here
                            item.action(item.key)
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
    )

    { innerPadding ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding).padding(horizontal =20.dp, vertical = 100.dp), // Apply padding provided by the Scaffold
            horizontalAlignment = Alignment.Start // Center the content
        ) {
            Text(
                text = "This pets are looking for a home. can be yours?",
                textAlign = TextAlign.Justify,
                style = MaterialTheme.typography.bodyMedium,

                )
        }
    }
}
