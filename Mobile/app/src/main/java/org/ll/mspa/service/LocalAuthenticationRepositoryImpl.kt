package org.ll.mspa.service

import kotlinx.coroutines.flow.Flow
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.local.LocalAuthenticationRepository
import org.ll.mspa.data.local.PreferencesDataSource

class LocalAuthenticationRepositoryImpl (
    val preferencesDataSource: PreferencesDataSource

): LocalAuthenticationRepository {


    var currentUser: UserInfo? = null

    override fun retrieveAuthenticatedUser(): Flow<UserInfo?> {
        return preferencesDataSource.getUserInfo()
    }

    override suspend fun saveAuthenticatedUser(user: UserInfo) {

        preferencesDataSource.saveUser(user)
    }

    override suspend fun deleteAuthenticatedUser() {
        preferencesDataSource.clearUser()
    }
}