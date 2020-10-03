import request from "../../util/request";


export function delDocumentById(id) {
  return request({
    url: "delDocumentById",
    method: "PUT",
    params: {
      "id": id
    }
  })
}

export function getAllDocumentListData() {
  return request({
    url: 'getAllDocumentData',
    method: 'GET',
  })
}

export function getDocumentDictListData() {
  return request({
    url: "getDocumentDictData",
    method: "GET",
    params: {
      "type": "article_type"
    }
  })
}

export function getDocumentMdContent(u) {
  return request({
    url: "getDocumentMdContent",
    method: "GET",
    params: {
      "u": u
    }
  })
}

export function upDocument(self) {
  return request({
    url: 'uploadDocument',
    method: 'POST',
    data: {
      "title": self.form.title,
      "type": self.form.type,
      "md": self.md,
      "html": null,
      "checkNum": 0,
      "isDel": 1
    },
  })
}

export function editDocumentSaveContentById(self) {
  return request({
    url: "editDocumentToSave",
    method: "POST",
    data: {
      "id": self.id,
      "md": self.md,
      "title": self.form.title,
      "type": self.form.type
    }
  })
}
