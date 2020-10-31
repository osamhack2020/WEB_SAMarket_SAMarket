/* Backend 서버를 대신해 임시로 만든 fakeServer
 API 를 정의함
*/

export function getPostInfoUpdater(info, setInfo) {
  console.log(info);
  return ({ type, title, sub, tags, fontClr, backClr, tagClr, content }) => {
    setInfo({
      type: type !== undefined ? type : info.type,
      title: title !== undefined ? title : info.title,
      sub: sub !== undefined ? sub : info.sub,
      tags: tags !== undefined ? tags : info.tags,
      clr: {
        font: fontClr !== undefined ? fontClr : info.clr.font,
        back: backClr !== undefined ? backClr : info.clr.back,
        tag: tagClr !== undefined ? tagClr : info.clr.tag
      },
      content: content !== undefined ? content : info.content
    });
  };
}
