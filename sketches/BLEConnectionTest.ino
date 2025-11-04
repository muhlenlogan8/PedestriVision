#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define LED_PIN 5
#define LED_PIN2 4

#define SERVICE_UUID        ""
#define CHARACTERISTIC_UUID ""

BLECharacteristic *pCharacteristic;

class CommandCallback: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value = pCharacteristic->getValue().c_str();

    if (value.length() > 0) {
      int command = value[0];
      if (command == 1) {
        digitalWrite(LED_PIN, HIGH);
        digitalWrite(LED_PIN2, HIGH);
        delay(1000);
        digitalWrite(LED_PIN, LOW);
        digitalWrite(LED_PIN2, LOW);
      }
    }
  }
};

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);

  BLEDevice::init("GPS_Glasses");
  BLEServer *pServer = BLEDevice::createServer();

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );

  pCharacteristic->setCallbacks(new CommandCallback());
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  BLEDevice::startAdvertising();

  Serial.println("BLE ready — waiting for connection");
}

void loop() {}
