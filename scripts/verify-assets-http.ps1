$base = "https://rosso-cucina-italiana.mi-c-openheimer.workers.dev"
$assets = @(
    "/assets/hero-fork-twirl.png",
    "/assets/hero-fork-empty.png",
    "/assets/hero-twirl-only.png",
    "/assets/spiral-spaghetti.png",
    "/assets/plate-dish.png",
    "/assets/ing-basil.png",
    "/assets/ing-mussel-open.png",
    "/assets/ing-mussel-2.png",
    "/assets/ing-shrimp.png",
    "/assets/ing-shrimp-2.png",
    "/assets/ing-tomato.png",
    "/assets/ing-tomato-2.png"
)

foreach ($a in $assets) {
    $res = Invoke-WebRequest -Uri ($base + $a) -Method Head -UseBasicParsing
    Write-Output "$a : StatusCode $($res.StatusCode) - $($res.Headers['Content-Type'])"
}
