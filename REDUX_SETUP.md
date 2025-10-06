# Redux Setup Documentation

This project has been configured with Redux Toolkit for state management.

## Structure

```
store/
├── index.ts              # Store configuration and exports
└── slices/
    └── counterSlice.ts   # Example counter slice
```

## Files Created/Modified

1. **store/index.ts** - Main store configuration with Redux Toolkit
2. **store/slices/counterSlice.ts** - Example slice demonstrating Redux Toolkit patterns
3. **hooks/use-redux.ts** - Typed Redux hooks for TypeScript support
4. **components/CounterExample.tsx** - Example component using Redux
5. **app/\_layout.tsx** - Updated to include Redux Provider

## Usage

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { increment, decrement } from "@/store/slices/counterSlice";

function MyComponent() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </View>
  );
}
```

### Creating New Slices

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyState {
  // Define your state shape
}

const initialState: MyState = {
  // Initial state
};

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    // Define your reducers
  },
});

export const {
  /* actions */
} = mySlice.actions;
export default mySlice.reducer;
```

### Adding Slices to Store

Update `store/index.ts`:

```typescript
import mySlice from "./slices/mySlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    mySlice: mySlice, // Add your slice here
  },
});
```

## Dependencies Installed

- `@reduxjs/toolkit` - Modern Redux with less boilerplate
- `react-redux` - React bindings for Redux

## TypeScript Support

The setup includes full TypeScript support with:

- Typed store state (`RootState`)
- Typed dispatch (`AppDispatch`)
- Typed hooks (`useAppDispatch`, `useAppSelector`)
