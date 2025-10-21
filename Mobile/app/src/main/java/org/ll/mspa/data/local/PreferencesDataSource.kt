package org.ll.mspa.data.local

import android.content.Context
import androidx.datastore.preferences.core.edit
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import org.ll.mspa.data.authentication.entity.UserInfo

class PreferencesDataSource (
    private val context: Context
) {
    suspend fun saveUser (userInfo: UserInfo){
        context.dataStore.edit {
            it[DataStoreKeys.IS_AUTHENTICATED] = true
            it[DataStoreKeys.DISPLAY_NAME] = userInfo.firstname
            it[DataStoreKeys.TOKEN] = userInfo.accessToken
        }
    }

    suspend fun clearUser (){
        context.dataStore.edit {
            it[DataStoreKeys.IS_AUTHENTICATED] = false
            it.remove(DataStoreKeys.DISPLAY_NAME)
            it.remove(DataStoreKeys.TOKEN)
        }
    }

    fun getUserInfo(): Flow<UserInfo?> {
        return context.dataStore.data
            .map {
                    preferences ->
                val isAuthenticated = preferences[DataStoreKeys.IS_AUTHENTICATED] ?: false
                val firstname = preferences[DataStoreKeys.DISPLAY_NAME]
                val accessToken  = preferences[DataStoreKeys.TOKEN]
                if (isAuthenticated){
                    UserInfo(firstname?:""
                        , "",
                        "",
                        accessToken?:"",
                        )
                } else {
                    null
                }
            }.distinctUntilChanged()
    }
}