import { SpotifyApi } from "https://esm.sh/@spotify/web-api-ts-sdk@1.2.0?bundle-deps&exports=SpotifyApi";

const api = SpotifyApi.withUserAuthorization(
  "e6d9b0ee602e45eeae9dad4e737b4fd8",
  "https://git.macropus.org/lollapalooza-2024/",
);

const artists = document.querySelectorAll("li");
const player = document.querySelector("iframe");

for (const element of artists) {
  element.style.cursor = "pointer";
  element.addEventListener("click", async () => {
    const result = await api.search(
      `artist:${element.textContent}}`,
      ["album"],
      "GB",
      10,
    );
    const [album] = result.albums.items.sort((a, b) =>
      a.release_date < b.release_date ? 1 : -1,
    );
    player.src = album.external_urls.spotify.replace(
      "open.spotify.com",
      "open.spotify.com/embed",
    );
  });
}
