package org.ll.mspa.data.local

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore


// create a extension method to context for storing the authentication data (preferences)
//
val Context.dataStore: DataStore<Preferences> by preferencesDataStore("auth_prefs")

