const getlocalStore= keys => {
    var data = {}
    var keys = [keys]
    keys.forEach(key => {
      try {
        let chunk = localStorage.getItem(`${key}`)
        if (chunk != null) {
          data[key] = JSON.parse(chunk)
        }
      } catch (err) {}
    })
  
    if (Object.keys(data).length > 0) {
      return data
    } else {
      return { auth: {}}
    }
  }

  export {getlocalStore}