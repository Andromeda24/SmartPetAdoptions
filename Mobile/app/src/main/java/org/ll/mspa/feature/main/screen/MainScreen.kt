package org.ll.mspa.feature.main.screen

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

import androidx.compose.foundation.layout.Row
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.Animation
import androidx.compose.material.icons.filled.CrueltyFree
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.ui.graphics.vector.ImageVector
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.nav.BottomNavItem
import org.ll.mspa.nav.MspaNavKey

// Data class to hold information for each navigation item

@Composable
fun MainScreen(
    navItems: List<BottomNavItem>,
    user: UserInfo
    )  {


    // State to keep track of the selected item index

    val mykey = "Main"

    Scaffold(
        modifier = Modifier.fillMaxSize(),
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
        floatingActionButton = {
            // A Column to stack the two FloatingActionButtons horizontally
            Row(
                verticalAlignment = Alignment.Bottom,
                horizontalArrangement = Arrangement.spacedBy(16.dp) // Spacing between FABs
            ) {
                // Login Button
                FloatingActionButton(
                    onClick = {

                         },
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally
                    ){
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.Logout,
                            contentDescription = "Logout"
                        )
                        Text ("Logout")
                    }

                }

                // Edit profile
                // Button
//                FloatingActionButton(
//                    onClick = { /* TODO: Handle Edit action */ },
//
//                ) {
//                    Column(
//                        horizontalAlignment = Alignment.CenterHorizontally
//                    ){
//                        Icon(
//                            imageVector = Icons.Default.Edit,
//                            contentDescription = "Edit Profile",
//                        )
//                        Text ("Edit Profile")
//                    }
//
//                }
            }
        }
    ) { innerPadding ->

        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding).padding(horizontal =20.dp, vertical = 100.dp), // Apply padding provided by the Scaffold
            contentAlignment = Alignment.TopCenter // Center the content
        ) {
            Text(
                text = "Welcome ${user.firstname} Smart Pet Adoption is an app that uses AI help people to find their ideal pet.\n" ,
                textAlign = TextAlign.Justify,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.TopCenter) // Center the content
            )
            Text(
                text = "Your favorite animals are waiting to be adopted:.\n" ,
                textAlign = TextAlign.Justify,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.BottomCenter) // Center the content
            )

        }
    }
}


@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    // It's good practice to wrap previews in your app's theme
    // Replace YourAppTheme with the actual name of your theme

  //      MainScreen()
}