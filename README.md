# uConn
# KOMUNIKATOR (APLIKACJA WEBOWA)

## INFO
- Nazwa projektu:        uConn
- Repozytorium projektu: github.com/kmfns/uConn
- Trello projektu:       

## LIBS
- Jezyk programowania:   Typescript
- Biblioteka:            React
- Frameworki:            Socket.io, Prisma, Tailwind
- Jezyk baz danych:      MySQL

## TEAM
Project Team:
 - Scrum Master:          Miłosz F
 - Frontend developer:    Bohdan
 - Backend developer:     Ivan
 - Projektant MySQL:      Szymon P
 - UI Designer:           Dmytro

## FUNCTIONALITY:
 - Możliwość tworzenia konta użytkownika
  - na podstawie podanego emailu
 - Możliwość tworzenia własnych serverów
  - servery maja określoną nazwę
  - servery maja określoną ikonę
  - servery maja wlasny panel konfiguracyjny
 - Możliwość tworzenia kanałów na serverze
  - Możliwość tworzenia kanałów tekstowych
  - Możliwość tworzenia kanałów glosowych
  - Możliwość tworzenia kanałów video
 - Możliwość edytowania wiadomosci tekstowych
  - tylko przez użytkownika ktory ją wysłał
 - Możliwość usuwania wiadomości tekstowych
  - przez użytkownika ktory ją wysłał
  - przez użytkownika z permisjami admina
 - Możliwość wysyłania plików na kanałach tekstowych
  - o dowolnym formacie
  - pliki graficzne (jpg, png) beda sie wyświetlać jako thumbnail
 - Implementacja funkcji search do przeszukiwania kanałów tekstowych
  - przeszukiwanie wszystkich wiadomości z określonym wyrazem
  - przeszukiwanie wszystkich wiadomości określonego użytkownika
 - Możliwość dodawania ludzi do servera przez zaproszenie
  - zaproszeniem jest specjalnie wygenerowany link
 - Możliwość sprawdzenia jacy użytkownicy znajdują się na serverze
  - każda wiadomość wyświetla przy sobie nick i avatar przypisanego jej użytkownika
 - Możliwość prowadzenia wiadomosci prywatnej z danym uzytkownikiem na serverze (DM)
 - Możliwość zarządzania użytkownikami servera
  - Możliwość nadawania im permisji moderatora
  - Możliwość kickowania użytkownika
  - Możliwość banowania użytkownika
 - Nieskończone wczytywanie: optymalizacja aplikacji poprzez dynamiczne wczytywanie wiadomości
 - Możliwość sprawdzenia jakości połączenia
