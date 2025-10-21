package org.ll.mspa.data.local

import kotlinx.coroutines.flow.Flow
import org.ll.mspa.data.authentication.entity.UserInfo

interface LocalAuthenticationRepository {
    fun retrieveAuthenticatedUser(): Flow<UserInfo?>
    suspend fun  saveAuthenticatedUser(user: UserInfo)
    suspend fun deleteAuthenticatedUser()
}