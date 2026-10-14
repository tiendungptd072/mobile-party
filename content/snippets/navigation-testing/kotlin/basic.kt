package snippets.navigation_testing.basic

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
import org.junit.Test
// #region show
@Test fun opensAdaProfile() {
    composeTestRule.setContent { AppNavHost() }

    composeTestRule.onNodeWithContentDescription("Open profile")
        .performClick()

    composeTestRule.onNodeWithText("Profile: Ada")
        .assertIsDisplayed()
}
// #endregion
