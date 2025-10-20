package org.ll.mspa.feature.main.viewmodel

import androidx.compose.ui.Modifier
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import org.ll.mspa.data.authentication.repository.LocalAuthenticationRepository
import org.ll.mspa.feature.main.state.SignInUpUiState

class SignInUpViewModel(
    // todo , remote repositories
    private val localAuthenticationRepository: LocalAuthenticationRepository
): ViewModel() {
    private val _loginUiState = MutableStateFlow(SignInUpUiState(false))

    val loginUIState : StateFlow<SignInUpUiState> = _loginUiState.asStateFlow()

    init {
        checkToken()
    }
    fun checkToken(){
        val user = localAuthenticationRepository.retrieveAuthenticatedUser()
        if (user != null){
            _loginUiState.update {
                it.copy(isAuthenticated = true,
                    currentUser = user,
                    )
            }
        }
    }
    fun login(username: String, password: String): Boolean{
        // 1. validate username end set the message in the field usernameMessage in state
        if (username.isEmpty()){
            _loginUiState.update {
                it.copy(usernameError = "Username is required")
            }
        } else {
            _loginUiState.update {
                it.copy(usernameError = null)
            }
        }
        // 2. validate password and set the message in the field passwordMessage in state
        if (password.isEmpty()){
            _loginUiState.update {
                it.copy(passwordError = "Password is required")
            }
        } else {
            _loginUiState.update {
                it.copy(passwordError = null)
            }
        }

        if (username.isEmpty() || password.isEmpty()){
            return false
        }
    // 3. call the SignInRemoteRepository to authenticate in the server

        // 4. set lastMessage for success or failure and update isAuthenticated
        _loginUiState.update {
            it.copy(isAuthenticated = true,
            passwordError = null,
            usernameError = null,
            lastError = "User Authenticated")
        }
        return true
    }
    fun clean(){
        _loginUiState.update {
            it.copy(usernameError = null,
                passwordError = null,
                lastError = "")
        }
    }
}