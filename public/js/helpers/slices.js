define(["hbs/handlebars", "underscore"], function (Handlebars, _) {
  /* Slices
   *
   * Create a sublist base on size cut, use it together with #each
   * Each iteration has these values defined:
   * @index, the starting index in the array for this slice;
   * @count, the 1-based iteration counter;
   * @size, the size of the current sub-list;
   * @first, true if this is the first slice;
   * @last, true if this is the last slice;
   * @odd, true if @index is odd,
   * @even, true if @index is even,
   *
   * Usage: {{#slices <arr> size=2 count=5}} ... {{/slices}}
   * Usage: {{#slices <arr> size=3 start=2 end=7}} ... {{/slices}}
   * Usage:
   {{#slices years size=5}}
     <div class="variants-group">
       {{#each this}}
         <input type="radio" name="year-radio" id="year-{{this}}">
      {{/each}}
     </div>
   {{/slices}}
  */
  function slices(context, options) {
    if (!_.isArray(context)) {
      return "";
    }

    var length = _.size(context),
      counter = 1,
      html = "",
      values = _.extend({
        start: 0,
        size: 1
      }, options.hash),
      index,
      data,
      slice;

    if (!values.end) {
      if (!values.count) {
        values.end = length;
      } else {
        values.end = Math.min(values.start + values.size * values.count, length);
      }
    } else {
      values.end = Math.min(values.end, length);
    }

    for (index = values.start; index < values.end; index += values.size) {
      slice = context.slice(index, Math.min(index + values.size, values.end));
      data = Handlebars.createFrame(options.data || {});
      data.index = index;
      data.count = counter++;
      data.size = slice.length;
      data.first = index === values.start;
      data.last = index + values.size >= values.end;
      data.odd = index % 2 === 1;
      data.even = !data.odd;
      html += options.fn(slice, {data: data});
    }

    return html;
  }

  Handlebars.registerHelper("slices", slices);
});
