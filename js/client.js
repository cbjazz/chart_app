window.client = (function() {
    function search(searchQuery, success) {
      return fetch('api/search', {
        method: 'post',
        body: JSON.stringfy(searchQuery),
        headers: {
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
        },
      }).then(checkStatus)
        .then(parseJSON)
        .then(success);
    }

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
      }
    }

    function parseJSON(response) {
      return response.json();
    }

    return{
      search,
    };
}());
