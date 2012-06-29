describe("FakeView", function () {

  it("should create mock objects using jquery", function () {
    var view = FakeView.stub({
      paragraph: FakeView.p()
    });

    expect(view.paragraph().get(0).tagName).toEqual("P");
  });

  it("should allow the creation of elements with different types of attributes", function () {
    var view = FakeView.stub({
      p1: FakeView.p({classes: ["a-css-class", "another-css-class"]}),
      p2: FakeView.p({"data-custom-attr": "custom-attr-value"}),
      cb1: FakeView.checkBox({checked: true}),
      div1: FakeView.div({css: {display: "none"}}),
      input1: FakeView.textInput({value: "text"}),
      hidden1: FakeView.hidden({value: "hidden-value"})
    });

    expect(view.p1().attr("class")).toEqual("a-css-class another-css-class");
    expect(view.p2().attr("data-custom-attr")).toEqual("custom-attr-value");
    expect(view.cb1().attr("checked")).toEqual("checked");
    expect(view.div1().css("display")).toEqual("none");
    expect(view.input1().val()).toEqual("text");
    expect(view.hidden1().val()).toEqual("hidden-value");
  });

  it("should create nested elements", function () {
    var view = FakeView.stub({
      div1: FakeView.div({contains: [
        FakeView.p({classes: ["p1"]}),
        FakeView.input({classes: ["i1"]}),
        FakeView.div({classes: ["d1"], contains: [
          FakeView.hidden({classes: ["h1"]})
        ]})
      ]})
    });

    expect(view.div1().get(0).tagName).toEqual("DIV");
    expect(view.div1().find(".p1").get(0).tagName).toEqual("P");
    expect(view.div1().find(".i1").get(0).tagName).toEqual("INPUT");
    expect(view.div1().find(".d1").get(0).tagName).toEqual("DIV");
    expect(view.div1().find(".d1").find(".h1").get(0).tagName).toEqual("INPUT");
  });

  it("should allow the creation of jquery arrays of elements", function () {
    var view = FakeView.stub({
      elements: [FakeView.p({classes: ["p1"]}), FakeView.div({classes: ["d1"]})]
    });

    expect(view.elements().length).toEqual(2);
    expect(typeof(view.elements().attr)).toEqual("function");
  });
});