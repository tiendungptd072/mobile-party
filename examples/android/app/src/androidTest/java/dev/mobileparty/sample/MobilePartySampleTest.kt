package dev.mobileparty.sample

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import org.junit.Rule
import org.junit.Test

class MobilePartySampleTest {
    @get:Rule
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun opensPostAndTogglesBookmark() {
        composeRule.onNodeWithContentDescription("Open Compose State").performClick()
        composeRule.onNodeWithText("Post detail").assertIsDisplayed()
        composeRule.onNodeWithText("Bookmark").performClick()
        composeRule.onNodeWithText("Remove bookmark").assertIsDisplayed()
    }
}
