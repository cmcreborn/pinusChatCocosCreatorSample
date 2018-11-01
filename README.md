# 目的
pinus 簡易聊天 sample 的客戶端, 使用CocosCreator 2.0.4

# Server Side
使用 pinus框架, clone 官方 pinus chat sample 或
直接 clone https://github.com/cmcreborn/pinusChatSample

可參考說明：  https://demo.newingtech.co.uk/2018/10/31/pinus-chat-sample/

# Client Side
使用 CocosCreator 2.0.4

可直接 clone 本專案: https://github.com/cmcreborn/pinusChatCocosCreatorSample

本專案使用場景為 chatSample

# 測試環境
MAC/PC : H5

APP : Android 8.0/ iOS 12.0

# 客戶端邏輯
1. 輸入使用者名稱以及聊天channel
2. LoginGate: 從 gate 取得 connector 的 host 以及 port
3. EntryConnector: 從上述取得的連線位置 連上connector  並且進入路由connector.entryHandler.enter
4. 輸入聊天訊息
5. SendMsg: 傳送路由 chat.chatHandler.send

# 執行畫面
![](https://demo.newingtech.co.uk/wp-content/uploads/2018/10/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7-2018-11-01-%E4%B8%8B%E5%8D%882.59.49-1024x573.png)


