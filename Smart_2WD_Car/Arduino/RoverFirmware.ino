#include <WiFiS3.h>
#include <ArduinoJson.h>

//====================== WIFI ======================//

char ssid[] = "WiFi_Name";
char pass[] = "WiFi_Password";

//=================== FIREBASE =====================//

const char* HOST = "your_link_of_the_database";
const int HTTPS_PORT = 443;

String command = "STOP";
int speed = 255;

//==================================================//

WiFiSSLClient client;

//============== MOTOR PINS ==============//

const int IN1 = 2;
const int IN2 = 4;

const int IN3 = 7;
const int IN4 = 8;

const int ENA = 10;
const int ENB = 11;

void connectWiFi()
{
  Serial.println();
  Serial.println("==============================");
  Serial.println("Connecting to WiFi...");
  Serial.println("==============================");

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.println("WiFi Connected!");

  Serial.print("SSID : ");
  Serial.println(WiFi.SSID());

  Serial.print("IP   : ");
  Serial.println(WiFi.localIP());

  Serial.print("RSSI : ");
  Serial.print(WiFi.RSSI());
  Serial.println(" dBm");

  Serial.println();
}

void setup()
{
  Serial.begin(115200);

  while (!Serial);

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);

  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);

  stopMotors();

  connectWiFi();
}

void loop()
{
  Serial.println("\n====================================");

  if (!client.connect(HOST, HTTPS_PORT))
  {
    Serial.println("Firebase Connection Failed!");
    delay(1000);
    return;
  }

  client.println("GET /rover/control.json HTTP/1.1");
  client.print("Host: ");
  client.println(HOST);
  client.println("Connection: close");
  client.println();

  bool jsonStarted = false;
  String jsonData = "";

  while (client.connected() || client.available())
  {
    if (client.available())
    {
      char c = client.read();

      // JSON starts with '{'
      if (c == '{')
      {
        jsonStarted = true;
      }

      if (jsonStarted)
      {
        jsonData += c;
      }
    }
  }

  client.stop();

  Serial.println("JSON Received:");
  Serial.println(jsonData);

  parseJSON(jsonData);

  delay(100);
}

void parseJSON(String json)
{
  StaticJsonDocument<128> doc;

  DeserializationError error = deserializeJson(doc, json);

  if (error)
  {
    Serial.print("JSON Error : ");
    Serial.println(error.c_str());
    return;
  }

  command = doc["command"].as<String>();
  speed = doc["speed"];

  Serial.println("------------------------");

  Serial.print("Command : ");
  Serial.println(command);

  Serial.print("Speed   : ");
  Serial.println(speed);

  if(command == "W")
  {
    moveForward(speed);
  }
  else if(command == "S")
  {
    moveBackward(speed);
  }
  else if(command == "A")
  {
    turnLeft(speed);
  }
  else if(command == "D")
  {
    turnRight(speed);
  }
  else if(command == "Q")
  {
    rotateLeft(speed);
  }
  else if(command == "E")
  {
    rotateRight(speed);
  }
  else
  {
    stopMotors();
  }

  Serial.println("------------------------");

}

void stopMotors()
{
    analogWrite(ENA, 0);
    analogWrite(ENB, 0);

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);

    digitalWrite(IN3, LOW);
    digitalWrite(IN4, LOW);

    analogWrite(ENA, 0);
    analogWrite(ENB, 0);

    Serial.println("Motors Stopped");
}

void moveForward(int pwm)
{
    analogWrite(ENA, pwm);
    analogWrite(ENB, pwm);

    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);

    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);

    Serial.println("Moving Forward");
}

void moveBackward(int pwm)
{
  
    analogWrite(ENA, pwm);
    analogWrite(ENB, pwm);

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);

    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);

    Serial.println("Moving Backward");
}

void rotateLeft(int pwm)
{ 
    analogWrite(ENA, pwm);
    analogWrite(ENB, pwm);

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);

    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);

    Serial.println("Rotate Left");
}

void rotateRight(int pwm)
{
    analogWrite(ENA, pwm);
    analogWrite(ENB, pwm);

    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);

    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);

    Serial.println("Rotate Right");
}

void turnLeft(int pwm)
{
    int leftPWM = pwm * 0.45;

    analogWrite(ENA, leftPWM);
    analogWrite(ENB, pwm);

    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);

    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);

    Serial.println("Turning Left");

    Serial.print("Left PWM : ");
    Serial.println(leftPWM);

    Serial.print("Right PWM: ");
    Serial.println(pwm);
}

void turnRight(int pwm)
{
    int rightPWM = pwm * 0.45;

    analogWrite(ENA, pwm);
    analogWrite(ENB, rightPWM);

    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);

    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);

    Serial.println("Turning Right");

    Serial.print("Left PWM : ");
    Serial.println(pwm);

    Serial.print("Right PWM: ");
    Serial.println(rightPWM);
}