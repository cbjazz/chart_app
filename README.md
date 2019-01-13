# chart_app
GPDB 의 GPTEXT를 이용해 CHART 검색을 수행하고 차트의 visualization 툴을 만드는 것을 목적으로 한다. 

Server side 는 flask web server를 
Client side 는 react.js으로 작성한다. 

Chart 는 thumbnail 용 GPDB 에서 matplotlib 를 이용해서 그리고, 
세부차트는 bokeh 를 사용할 예정이다. 

이 프로젝트는 개인 공부용으로 작성하고 있기 때문에 코드 최적화는 되어 있지 않다. 
또한 GPDB + GPTEXT 와 연동해서 작동하기 때문에 이 앱을 다운받아서 바로 사용할 수 없다. 
App 생성과정은 blog 에 설명되어있다. 
* https://blog.naver.com/cbjazz77/


현재 이 앱은 3부분으로 나뉘어있다. 
1. API - flask restlet server
* 실행: python app.py
2. Chart Server - flask + bokeh server
* 실행: python app_bokeh.py
3. UI Server - react-script + semantic-ui-react
* 실행 npm start

