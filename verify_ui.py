from playwright.sync_api import sync_playwright

def verify_video_editor_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the editor page
        # Assuming the ID 1 is valid based on previous work
        page.goto("http://localhost:3000/editor/1")

        # Wait for key elements to ensure page is loaded
        page.wait_for_selector("text=Prompt")
        page.wait_for_selector("text=Silent Passage")

        # Take a full page screenshot
        page.screenshot(path="video_editor_ui.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_video_editor_ui()
