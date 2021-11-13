function initAd(url, openUrl) {
  const headDom = document.querySelector("head");
  const style = document.createElement("style");
  style.innerHTML = `
        .ad-wrap {
            min-height: 200px;
            cursor: pointer;
        }
        .ad-wrap .ad-img{
          position: fixed;
          right: 20px;
          bottom: 100px;
          width: 134px;
          height: 77px;
          background: url(${url});
          background-size: 100% 100%;
        }
        .ad-wrap-stick{
            position: sticky;
            top: 0;
        }
        .close{
          width: 18px;
          height: 18px;
          position: absolute;
          right: 8px;
          top: 4px;
          cursor: pointer;
        }
    `;
  const adContainer = document.createElement("div");
  adContainer.className = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
    ? "ad-wrap-stick"
    : "ad-wrap";

  const adImg = document.createElement("div");
  adImg.className = "ad-img";
  adImg.onclick = function () {
    window.open(openUrl);
  };
  /** close icon 不兼容IE */
  let closeIconTemplate = document.createElement("template");
  closeIconTemplate.innerHTML = `<svg id="close-ad" class="close" t="1636730213036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1686"><path d="M512 0a512 512 0 0 0-512 512 512 512 0 0 0 512 512 512 512 0 0 0 512-512 512 512 0 0 0-512-512z" fill="#000000" p-id="1687"></path><path d="M717.165714 306.176a35.986286 35.986286 0 0 0-50.834285 0.146286L512 461.019429 357.668571 306.322286a35.986286 35.986286 0 0 0-50.980571 50.761143L461.165714 512 306.688 666.916571a35.986286 35.986286 0 0 0 50.980571 50.761143L512 562.980571l154.331429 154.843429a35.693714 35.693714 0 0 0 50.834285 0.073143 35.986286 35.986286 0 0 0 0.146286-50.907429L562.834286 512l154.331428-154.916571a35.913143 35.913143 0 0 0 0-50.907429z" fill="#FFFFFF" p-id="1688"></path></svg>`;
  closeIconTemplate.content.lastChild.onclick = function (e) {
    e.stopPropagation();
    document.body.removeChild(adContainer);
  };

  // insertAdjacentHTML() 方法将指定的文本解析为 Element 元素，并将结果节点插入到DOM树中的指定位置。
  // adImg.insertAdjacentHTML(
  //   "afterbegin",
  //   '<svg id="close-ad" class="close" t="1636730213036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1686"><path d="M512 0a512 512 0 0 0-512 512 512 512 0 0 0 512 512 512 512 0 0 0 512-512 512 512 0 0 0-512-512z" fill="#000000" p-id="1687"></path><path d="M717.165714 306.176a35.986286 35.986286 0 0 0-50.834285 0.146286L512 461.019429 357.668571 306.322286a35.986286 35.986286 0 0 0-50.980571 50.761143L461.165714 512 306.688 666.916571a35.986286 35.986286 0 0 0 50.980571 50.761143L512 562.980571l154.331429 154.843429a35.693714 35.693714 0 0 0 50.834285 0.073143 35.986286 35.986286 0 0 0 0.146286-50.907429L562.834286 512l154.331428-154.916571a35.913143 35.913143 0 0 0 0-50.907429z" fill="#FFFFFF" p-id="1688"></path></svg>'
  // );

  /** icon appendChild */
  adImg.appendChild(closeIconTemplate.content.lastChild);
  /** img appendChild */
  adContainer.appendChild(adImg);
  /** container appendChild */
  document.body.appendChild(adContainer);
  headDom.appendChild(style);
}
initAd(
  "http://img.netbian.com/file/2021/1108/d86efb4d000a4c6be44e54efde6a94c6.jpg",
  "http://www.baidu.com"
);
