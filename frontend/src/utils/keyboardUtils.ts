const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const form = e.currentTarget.form;

    if (form) {
      const inputElements = Array.from(
        form.querySelectorAll("input")
      ) as HTMLInputElement[];
      const currentIndex = inputElements.findIndex(
        (input) => input.name === e.currentTarget.name
      );
      const nextInput = inputElements[currentIndex + 1];

      const currentInput = inputElements[currentIndex];

      if (nextInput) {
        nextInput.focus();
      } else {
        form.requestSubmit();
        currentInput.blur();
      }
    }
  }
};

export default handleKeyDown;
