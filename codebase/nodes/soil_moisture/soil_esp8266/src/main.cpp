#include <ArduinoJson.h>
#include <painlessMesh.h>
#include "secrets.h"

Scheduler userScheduler;
painlessMesh  mesh;

void sendMessage();

Task taskSendMessage(TASK_SECOND * 1, TASK_FOREVER, &sendMessage);

String getReadings () {
  String data = "";
  StaticJsonDocument<256> json;

  json["node"] = mesh.getNodeId(); // mac (10 chars)
  json["temp"] = 25.6; // -30 to 80
  json["hum"] = 65.8; // 0-100
  json["light"] = 150000; // 0-200000
  json["mo_1"] = 75.2; // 0-100
  json["mo_2"] = 65.3; // 0-100
  json["mo_3"] = 68.1; // 0-100
  json["mo_4"] = 69.5; // 0-100
  serializeJson(json, data);

  return data;
}

void sendMessage() {
  // String msg = "Hi from ESP32 1 ";
  // msg += mesh.getNodeId();
  String msg = getReadings();
  mesh.sendBroadcast(msg);
  //taskSendMessage.setInterval(random(TASK_SECOND * 1, TASK_SECOND * 5));
}

void receivedCallback(uint32_t from, String &msg) {
  Serial.printf("Recv: Message from %u => %s\n", from, msg.c_str());
}

void newConnectionCallback(uint32_t nodeId) {
    Serial.printf("--> New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.printf("Recv: Changed connections\n");
}

void nodeTimeAdjustedCallback(int32_t offset) {
    Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(),offset);
}

void setup() {
  Serial.begin(115200);

//mesh.setDebugMsgTypes(ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE); // all types
  mesh.setDebugMsgTypes(ERROR | STARTUP);  // set before init() so that you can see startup messages

  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  userScheduler.addTask(taskSendMessage);
  taskSendMessage.enable();
}

void loop() {
  mesh.update();
}
