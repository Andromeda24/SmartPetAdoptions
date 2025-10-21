
package org.ll.mspa.feature.main.screen

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import org.ll.mspa.feature.main.viewmodel.SignInUpViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.local.PreferencesDataSource
import org.ll.mspa.service.LocalAuthenticationRepositoryImpl

// Data class to hold information for each navigation item

@Composable
fun SignInUpScreen(modifier: Modifier, onLogin: (user: UserInfo) -> Boolean) {

    Scaffold(
        modifier = Modifier.fillMaxSize(),

    ) { innerPadding ->
// for security Purposes, Login credentials are not stored in the UiState
        val context = LocalContext.current
        var username by remember { mutableStateOf (value = "") }
        var password by remember { mutableStateOf (value = "") }

        val signInUpViewModel: SignInUpViewModel = viewModel {
            SignInUpViewModel(LocalAuthenticationRepositoryImpl(
                PreferencesDataSource(context)
            ))
        }
        val currentState by signInUpViewModel.loginUIState.collectAsStateWithLifecycle()

        if (currentState.isAuthenticated && currentState.currentUser != null){
            onLogin(currentState.currentUser!!)
        }

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
                            if (currentState.isAuthenticated && currentState.currentUser != null){
                                val toast = Toast.makeText(
                                    context,
                                    "User ${currentState.currentUser?.firstname} Authenticated",
                                    Toast.LENGTH_SHORT
                                )
                                toast.show()
                                // redirect to main screen
                                    onLogin(currentState.currentUser!!)

                                username = ""
                                password = ""
                                signInUpViewModel.clean()
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

        SignInUpScreen(Modifier,{
            //backStack.add(MspaNavKey.Main)
            true
        }
        )
}