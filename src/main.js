// 参考了这个：https://github.com/silver-ymz/bob-plugin-latex-ocr/blob/master/src/main.js

function ocr(query, completion) {
  const { api_key } = $option;
  const url = 'https://api.mathpix.com/v3/text';

  if (!api_key) {
    completion({
      error: {
        type: "param",
        message: "未设置API Key",
      }
    });
    return
  }

  const image_data = 'data:image/png;base64,' + query.image.toBase64();

  let res = $http.post({
    url: url,
    header: {
      'Content-Type': 'application/json',
      'app_id': 'bob-plugin-mathpix',
      'app_key': api_key
    },
    body: {
      url: image_data
    }
  });

  res.then((resp) => {
    let data = resp.data;
    completion({
      result: {
        texts: [
          { text: 'version: ' + data.version + '\n' },
          { text: 'latex_styled: \n' },
          { text: data.text },
        ]
      }
    });
  })
  .catch((error) => {
    completion({
      error: {
        type: "api",
        message: JSON.stringify(error)
      }
    });
  });

  return

  completion({
    result: {
      texts: [
        { text: "Hello, World" },
      ]
    }
  });
}
