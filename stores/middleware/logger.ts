export const logger =
  <T>(
    f: (
      set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
      get: () => T
    ) => T
  ) =>
  (
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
    get: () => T
  ) => {
    let previousState = {} as T;

    const loggedSet = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
      const currentState = get();

      // Calculate the new state
      const newPartialState =
        typeof partial === "function" ? partial(currentState) : partial;
      const newState = { ...currentState, ...newPartialState };

      // Find differences between previous and new state
      const differences: Record<string, { from: unknown; to: unknown }> = {};

      for (const key in newState) {
        if (key in (previousState as any)) {
          if (
            (previousState as Record<string, unknown>)[key] !==
            (newState as Record<string, unknown>)[key]
          ) {
            differences[key] = {
              from: (previousState as Record<string, unknown>)[key],
              to: (newState as Record<string, unknown>)[key],
            };
          }
        } else {
          // New property added
          differences[key] = {
            from: undefined,
            to: (newState as Record<string, unknown>)[key],
          };
        }
      }

      // Log the changes
      if (Object.keys(differences).length > 0) {
        console.group(
          `🏪 UserStore State Change - ${new Date().toLocaleTimeString()}`
        );
        console.log("📊 Differences:", differences);
        console.log("📤 Previous State:", previousState);
        console.log("📥 New State:", newState);
        console.groupEnd();
      }

      // Update previous state for next comparison
      previousState = { ...newState };

      // Call the original set function
      set(partial);
    };

    // Initialize with the current state
    const store = f(loggedSet, get);
    previousState = { ...store };

    return store;
  };
