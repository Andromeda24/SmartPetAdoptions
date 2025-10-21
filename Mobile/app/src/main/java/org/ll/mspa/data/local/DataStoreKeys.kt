package org.ll.mspa.data.local

import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey

object DataStoreKeys {
    val IS_AUTHENTICATED = booleanPreferencesKey("IS_AUTHENTICATED")
    val DISPLAY_NAME = stringPreferencesKey("DISPLAY_NAME")
    val TOKEN = stringPreferencesKey("TOKEN")
}