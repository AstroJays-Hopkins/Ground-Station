/*
This code was written for testing purposes of the Rocket Ground Station GUI.
-Author: AstroJays
*/

void setup() {
  Serial.begin(9600);    
  int altitude = random(5);
  int acc = random(5);
  int ang = random(5);
}

void loop() {
  int altitude = random(5);
  int acc = random(5);
  int ang = random(5);
  
  Serial.println("Altitude:");
  Serial.println(altitude);
  Serial.println("Acceleration:");
  Serial.println(acc);
  Serial.println(acc+random(5)); 
  Serial.println(acc+random(5));
  Serial.println("Angular orientation:");
  Serial.println(ang+random(5));
  Serial.println(ang+random(5)); 
  Serial.println(ang+random(5));
  delay(1500);
}
