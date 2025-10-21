package org.ll.mspa.feature.main.viewmodel

import android.util.Log
import androidx.compose.ui.Modifier
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.local.LocalAuthenticationRepository
import org.ll.mspa.feature.main.state.SignInUpUiState

class SignInUpViewModel(
    // todo , remote repositories
    private val localAuthenticationRepository: LocalAuthenticationRepository
): ViewModel() {
    private val _loginUiState = MutableStateFlow(SignInUpUiState())

    val loginUIState : StateFlow<SignInUpUiState> = _loginUiState.asStateFlow()

    fun login(username: String, password: String){
        viewModelScope.launch {

            // 1. validate username end set the message in the field usernameMessage in state
            if (username.isEmpty()){
                _loginUiState.update {
                    it.copy(usernameError = "Username is required",)
                }
            } else {
                _loginUiState.update {
                    it.copy()
                }
            }
            // 2. validate password and set the message in the field passwordMessage in state
            if (password.isEmpty()){
                _loginUiState.update {
                    it.copy(passwordError = "Password is required",)
                }
            } else {
                _loginUiState.update {
                    it.copy()
                }
            }

            if (username.isEmpty() || password.isEmpty()){
                return@launch
            }
    // 3. call the SignInRemoteRepository to authenticate the credentials in the server
           var newUser = UserInfo("John","Doe",
               "johnny@mail.com","123")
            // 4. update user preference file
            localAuthenticationRepository.saveAuthenticatedUser(newUser)
        // 5. set lastMessage for success or failure and update isAuthenticated
            _loginUiState.update {
                it.copy(isAuthenticated = true,
                    passwordError = null,
                    usernameError = null,
                    lastError = "User Authenticated",
                    currentUser = newUser
                )
            }
        }

    }
    fun clean(){
        _loginUiState.update {
            it.copy()
        }
    }
}