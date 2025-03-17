async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value.trim();
    const alias = document.getElementById("alias").value.trim();

    if (!longUrl) {
        alert("Please enter a valid URL");
        return;
    }

    let apiUrl = `https://s.harishhonda.com/api/${encodeURIComponent(longUrl)}`;
    if (alias) {
        apiUrl += `?alias=${encodeURIComponent(alias)}`;
    }

    try {
        const response = await fetch(apiUrl);

        // Ensure the response is valid
        if (!response.ok) {
            throw new Error("Failed to shorten URL");
        }

        const data = await response.json(); // Parse JSON response

        if (data.short_url) {
            document.getElementById("shortUrl").value = data.short_url; // Show short URL
            document.getElementById("result").style.display = "block"; // Show copy section
        } else {
            alert("Error: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        alert("Error connecting to the server: " + error.message);
    }
}

function copyUrl() {
    const shortUrl = document.getElementById("shortUrl");
    shortUrl.select();
    navigator.clipboard.writeText(shortUrl.value)
        .then(() => alert("Copied to clipboard: " + shortUrl.value))
        .catch(() => alert("Failed to copy URL"));
}
