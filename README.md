# Todo App

Simple todo list built with **Expo**, **React Native**, and **TypeScript**.

Add a task, tap to complete it, delete it. Todos are saved on the device with AsyncStorage.

## Run

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

```bash
npm run android    # Android
npm run typecheck  # TypeScript check
```

## How it works

| File | Role |
|------|------|
| `App.tsx` | App entry — wraps the screen in SafeAreaProvider |
| `src/HomeScreen.tsx` | Main UI — input, list, counters |
| `src/useTodos.ts` | State — add / toggle / delete + local save |
| `src/components/TodoItem.tsx` | One row in the list |
| `src/types.ts` | `Todo` type |
| `src/theme.ts` | Colors |

Flow:

1. `useTodos` holds the list in React state
2. Changes are written to AsyncStorage
3. `HomeScreen` renders the input + list
4. Tapping a row toggles `done`; ✕ removes it

## Stack

- Expo SDK 57
- React Native
- TypeScript (strict)
- AsyncStorage
