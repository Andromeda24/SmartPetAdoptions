
package org.ll.mspa.feature.main.screen

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Login
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.TextField
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.ll.mspa.feature.main.viewmodel.SignInUpViewModel
import androidx.lifecycle.viewmodel.compose.viewModel

// Data class to hold information for each navigation item

@Composable
fun SignInUpScreen() {

    Scaffold(
        modifier = Modifier.fillMaxSize(),

//        floatingActionButton = {
//            // A Column to stack the two FloatingActionButtons horizontally
//            Row(
//                verticalAlignment = Alignment.Bottom,
//                horizontalArrangement = Arrangement.spacedBy(16.dp) // Spacing between FABs
//            ) {
//                // Login Button
//                FloatingActionButton(
//                    onClick = { /* TODO: Handle Add action */ },
//                ) {
//                    Column(
//                        horizontalAlignment = Alignment.CenterHorizontally
//                    ){
//                        Icon(
//                            imageVector = Icons.AutoMirrored.Filled.Login,
//                            contentDescription = "Login"
//                        )
//                        Text ("Log-in")
//                    }
//
//                }
//
//                // Sign in Button
//                FloatingActionButton(
//                    onClick = { /* TODO: Handle Edit action */ },
//
//                ) {
//                    Column(
//                        horizontalAlignment = Alignment.CenterHorizontally
//                    ){
//                        Icon(
//                            imageVector = Icons.Default.Add,
//                            contentDescription = "Register",
//                        )
//                        Text ("Sign-Up")
//                    }
//
//                }
//            }
//        }
    ) { innerPadding ->
// for security Purposes, Login credentials are not stored in the UiState
        val context = LocalContext.current
        var username by remember { mutableStateOf (value = "") }
        var password by remember { mutableStateOf (value = "") }

        val signInUpViewModel: SignInUpViewModel = viewModel {
            SignInUpViewModel()
        }
        val currentState by signInUpViewModel.loginUIState.collectAsStateWithLifecycle()

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding).padding(horizontal =20.dp, vertical = 100.dp), // Apply padding provided by the Scaffold
            horizontalAlignment = Alignment.Start // Center the content
        ) {
            Text(
                text = "Smart Pet Adoption uses AI help people to find their ideal pet.\n" +
                        "To continue, please Log-in",
                textAlign = TextAlign.Justify,
                style = MaterialTheme.typography.bodyMedium,

            )


            OutlinedTextField(
                value=username,
                onValueChange = {
                        data -> username = data
                },
                label = { Text(text="username")},
                keyboardOptions = KeyboardOptions (keyboardType =KeyboardType.Email),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(all = 10.dp) , // shaping the keyboard into the screen
                isError = currentState.usernameError != null,
                supportingText = {
                    if (currentState.usernameError != null) {
                        Text(text =currentState.usernameError?:"")
                    }
                }
            )



            OutlinedTextField(
                value=password,
                onValueChange = {
                    //data -> password = data
                    password = it // other way to write the function
                },
                label = { Text(text="Password")},
                keyboardOptions = KeyboardOptions (keyboardType = KeyboardType.NumberPassword),
                visualTransformation = PasswordVisualTransformation(),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(all = 10.dp),  // shaping the keyboard into the screen
                isError = currentState.passwordError != null,
                supportingText = {
                    if (currentState.passwordError != null) {
                        Text(text =currentState.passwordError?:"")
                    }
                }
            )
            Row (
                horizontalArrangement = Arrangement.Absolute.SpaceEvenly,
                modifier = Modifier.fillMaxWidth()

            ){

                // future research : with custom views, you can customize the button
                Button(
                    onClick = {
                        username = ""
                        password = ""
                        signInUpViewModel.clean()
                    },
                    Modifier.padding(all = 10.dp)

                    ) {
                    Text ( text = "Clear")
                }

                Button(

                    onClick = {
                        signInUpViewModel.login(username,password)
                        if (currentState.isAuthenticated){
                            val toast = Toast.makeText(
                                context,
                                "User Authenticated",
                                Toast.LENGTH_LONG
                            )

                            toast.show()
                            username = ""
                            password = ""
                            signInUpViewModel.clean()

                            // redirect to main screen

                        }
                    },Modifier.padding(all = 10.dp),

                    ) {
                    Text ( text = "Submit")
                }
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun WelcomeScreenPreview() {
    // It's good practice to wrap previews in your app's theme
    // Replace YourAppTheme with the actual name of your theme

        SignInUpScreen()
}