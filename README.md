GET items
===========  
기능 : 아이템 목록 조회  
--------------
## Method : GET  
## API URL : /api/items  
## request body : { }  
## response body :
```json
{
"itemlist": [
{  
0: {
"item_code": 1,
"item_name": "막대기",
"item_stat": {
"health": 20,
"power": 2
}
},  
1: {
"item_code": 2,
"item_name": "너덜너덜한 고무신",
"item_stat": {
"health": 20,
"power": 2
}
},  
2: {
"item_code": 3,
"item_name": "파멸의 반지",
"item_state": {
"health": 20,
"power": 2
}
},  
"_id": "66467658ec1788ea679fa5e8"
}
]
}
```  
  
PATCH item
============================
기능: 아이템 수정
----------------
## method: put
## api url: /api/items
## request body: {}
## response:
>>{Cannot PUT /api/items}  
  
POST item
==========
기능: 아이템 생성
------
## method: post 
## API URL: /api/items
## request body:
```json
{
	"item_code": "3",
	"item_name": "test item",
	"item_stat": {"health": 20 ,"power":2}
}
```
## response: 
>>Cannot POST /api/items  
  
GET item(details)
=============
기능: 상세정보 열람
----------
## method: get
## API URL: /api/items
## request body: {}
## response:
```json
{
	"itemlist": [
		{
			"0": {
				"item_code": 1,
				"item_name": "막대기",
				"item_stat": {
					"health": 20,
					"power": 2
				}
			},
			"1": {
				"item_code": 2,
				"item_name": "너덜너덜한 고무신",
				"item_stat": {
					"health": 20,
					"power": 2
				}
			},
			"2": {
				"item_code": 3,
				"item_name": "파멸의 반지",
				"item_stat": {
					"health": 20,
					"power": 2
				}
			},
			"_id": "66467658ec1788ea679fa5e8"
		}
	]
}  
```
  
POST characters
===============
기능: 캐릭터 생성
## method: post
## API URL: /api/characters
## request body: {}
## response: 
>>{
	"errorMessage": "데이터가 존재하지 않습니다."
}  
  
GET characters
===============
기능: 캐릭터 조회
--------------
## method: get
## API URL: /api/characters
## request body: {}
## response:
>>Cannot GET /api/characters  
   
DELETE characters
==============
기능: 캐릭터 삭제
--------------
## method: delete
## API URL: /api/characters
## request body: {}
## response: 
>>Cannot DELETE /api/characters