package org.ll.mspa.feature.main.state

import org.ll.mspa.data.authentication.entity.UserInfo


data class SignInUpUiState(
    val isAuthenticated: Boolean = false,
    val lastError: String = "",
    val currentUser: UserInfo? = null,
    val isLoading: Boolean = false,
    val usernameError: String? = null,
    val passwordError: String? = null
)
