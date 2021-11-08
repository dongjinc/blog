function initAd(url) {
  const headDom = document.querySelector("head");
  const style = document.createElement("style");
  style.innerHTML = `
        .ad-wrap {
            min-height: 200px;
        }
        .ad-wrap img {
          position: fixed;
          right: 20px;
          bottom: 100px;
        }
        .ad-wrap-stick{
            position: sticky;
            top: 0;
        }
    `;
  const adContent = `
        <div class="${
          /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
            ? "ad-wrap-stick"
            : "ad-wrap"
        }">
            <img src="${url}" width="134px" height="84px" />
        </div>
        `;
  document.write(adContent);

  headDom.appendChild(style);
}
initAd(
  "http://img.netbian.com/file/2021/1108/d86efb4d000a4c6be44e54efde6a94c6.jpg"
);
