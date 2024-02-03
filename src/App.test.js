test("correctly calculates the percentage of floating point numbers", () => {
    const mockSetCalc = jest.fn();
    const mockCalc = {
        sign: "",
        num: "5.4",
        res: "0",
    };

    percentClickHandler(mockSetCalc, mockCalc);

    expect(mockSetCalc).toHaveBeenCalledWith({
        ...mockCalc,
        num: "0.054",
        res: "0",
        sign: "",
    });
});

test("correctly calculates the percentage of zero", () => {
    const mockSetCalc = jest.fn();
    const mockCalc = {
        sign: "",
        num: "0",
        res: "100",
    };

    percentClickHandler(mockSetCalc, mockCalc);

    expect(mockSetCalc).toHaveBeenCalledWith({
        ...mockCalc,
        num: "0",
        res: "1",
        sign: "",
    });
});

test("keeps the result as zero when there is no number defined", () => {
    const mockSetCalc = jest.fn();
    const mockCalc = {
        sign: "+",
        num: "",
        res: "10",
    };

    percentClickHandler(mockSetCalc, mockCalc);

    expect(mockSetCalc).toHaveBeenCalledWith({
        ...mockCalc,
        num: "0",
        res: "10",
        sign: "",
    });
});
