package org.ll.mspa.data.service

import kotlinx.coroutines.flow.Flow
import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.local.LocalAuthenticationRepository

class FakeLocalAuthenticationRepositoryImpl () //: LocalAuthenticationRepository
 {

    private var currentUser: UserInfo? = UserInfo(
        "pedro",
        "perez",
        "pp@mal.com",
        "123"
    )

    //override
    fun retrieveAuthenticatedUser(): UserInfo? {
        //TODO("Not yet implemented")
        return currentUser
    }

    //override
    fun saveAuthenticatedUser(user: UserInfo) {
        //TODO("Not yet implemented")
        currentUser = user
    }

   // override
    suspend fun deleteAuthenticatedUser() {
        //TODO("Not yet implemented")
        currentUser = null
    }
}