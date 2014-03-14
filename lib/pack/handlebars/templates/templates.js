(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['endForm.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n	<a href=\""
    + escapeExpression(((helper = helpers.deleteRoute || (depth0 && depth0.deleteRoute)),(typeof helper === functionType ? helper.call(depth0, {"name":"deleteRoute","hash":{},"data":data}) : helper)))
    + "\" class=\"button secondary form-delete-button\"/>Delete</a>\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual) || helperMissing,helper.call(depth0, (depth0 && depth0.method), "PUT", {"name":"ifEqual","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " \n	<input type=\"submit\" value=\"Save\" class=\"button form-save-button\" /> \n</form>";
},"useData":true});
templates['endGroup.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "</div>";
  },"useData":true});
templates['endGroupArray.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  return "add-one-custom";
  },"3":function(depth0,helpers,partials,data) {
  return "add-one";
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.ref || (depth0 && depth0.ref)),(typeof helper === functionType ? helper.call(depth0, {"name":"ref","hash":{},"data":data}) : helper)))
    + "-";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "	</div>\n	<div>\n		<input type='button' class='button ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.customButton), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-src='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ref), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-__i__-group' data-dest='group-many-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-content' id='group-many-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-content-button' value='"
    + escapeExpression(((helper = helpers.addlabel || (depth0 && depth0.addlabel)),(typeof helper === functionType ? helper.call(depth0, {"name":"addlabel","hash":{},"data":data}) : helper)))
    + "'>\n	</div>\n</div>";
},"useData":true});
templates['endGroupItem.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ref), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.ref || (depth0 && depth0.ref)),(typeof helper === functionType ? helper.call(depth0, {"name":"ref","hash":{},"data":data}) : helper)))
    + "-";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "			<div class=\"button micro alert group-remove-button\" data-src-remove=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mock), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fi-x\"></i></div>\n		</div>\n		<!-- END COLUMN -->\n	</div>\n	<!-- END ROW -->\n</div>\n<!-- END GROUP -->";
},"useData":true});
templates['file.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "["
    + escapeExpression(((helper = helpers['short'] || (depth0 && depth0['short'])),(typeof helper === functionType ? helper.call(depth0, {"name":"short","hash":{},"data":data}) : helper)))
    + "]";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div id='image-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>\n		<a href='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' >"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "</a>\n	\n	<input type='hidden' name='"
    + escapeExpression(((helper = helpers.key || (depth0 && depth0.key)),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['short']), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n	<div class='button secondary small remove-image' data-key='"
    + escapeExpression(((helper = helpers.key || (depth0 && depth0.key)),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)))
    + "' data-src='image-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-nodata' data-dest='image-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='remove image'/><i class='general foundicon-minus'></i> Replace Image\n	</div>\n</div>";
},"useData":true});
templates['help.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class='help'><i class=\"fi-checkbox\"></i> "
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
templates['hidden.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.override || (depth0 && depth0.override)),(typeof helper === functionType ? helper.call(depth0, {"name":"override","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)));
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<input type='hidden' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.override), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" />";
},"useData":true});
templates['image.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.imageWidth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  },"3":function(depth0,helpers,partials,data) {
  return "150";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div id='image-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\"image-cluster\">\n	<div class='th'>\n		<img src='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' width='";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.imageWidth), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "' />\n	</div>\n	<input type='hidden' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n	<div class='button secondary small remove-image' data-key='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' data-id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-src='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-nodata' data-dest='image-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='remove image'/><i class='general foundicon-minus'></i> Replace Image\n	</div>\n</div>";
},"useData":true});
templates['password.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<label for='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n<input type='password' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" />";
},"useData":true});
templates['readonly.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['default']), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers['default'] || (depth0 && depth0['default'])),(typeof helper === functionType ? helper.call(depth0, {"name":"default","hash":{},"data":data}) : helper)));
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<h3>"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "</h3>\n<input type='hidden' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.val), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>";
},"useData":true});
templates['selectList.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<label for='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</label>";
},"2":function(depth0,helpers,partials,data) {
  return " <small>*required</small>";
  },"4":function(depth0,helpers,partials,data) {
  return "required";
  },"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<option value>"
    + escapeExpression(((helper = helpers.message || (depth0 && depth0.message)),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</option>";
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<small class=\"error\">"
    + escapeExpression(((helper = helpers.errorMsg || (depth0 && depth0.errorMsg)),(typeof helper === functionType ? helper.call(depth0, {"name":"errorMsg","hash":{},"data":data}) : helper)))
    + "</small>";
},"10":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div class=\"select-holder\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<select name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.message), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  stack1 = ((helper = helpers.src || (depth0 && depth0.src)),(typeof helper === functionType ? helper.call(depth0, {"name":"src","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pattern), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});
templates['startFormPost.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<form method='"
    + escapeExpression(((helper = helpers.method || (depth0 && depth0.method)),(typeof helper === functionType ? helper.call(depth0, {"name":"method","hash":{},"data":data}) : helper)))
    + "' action='"
    + escapeExpression(((helper = helpers.action || (depth0 && depth0.action)),(typeof helper === functionType ? helper.call(depth0, {"name":"action","hash":{},"data":data}) : helper)))
    + "' enctype='multipart/form-data'>";
},"useData":true});
templates['startFormPut.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  return "\n<input type='hidden' name='_method' value='PUT' />\n";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<form method='POST' action='"
    + escapeExpression(((helper = helpers.endpoint || (depth0 && depth0.endpoint)),(typeof helper === functionType ? helper.call(depth0, {"name":"endpoint","hash":{},"data":data}) : helper)))
    + "' enctype='multipart/form-data' id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-abide>\n";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual) || helperMissing,helper.call(depth0, (depth0 && depth0.method), "PUT", {"name":"ifEqual","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['startGroup.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ref), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.ref || (depth0 && depth0.ref)),(typeof helper === functionType ? helper.call(depth0, {"name":"ref","hash":{},"data":data}) : helper)))
    + "-";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-total='"
    + escapeExpression(((helper = helpers.total || (depth0 && depth0.total)),(typeof helper === functionType ? helper.call(depth0, {"name":"total","hash":{},"data":data}) : helper)))
    + "'";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div id='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mock), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.total), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "><h2>"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>";
},"useData":true});
templates['startGroupArray.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<h2>"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-total='"
    + escapeExpression(((helper = helpers.total || (depth0 && depth0.total)),(typeof helper === functionType ? helper.call(depth0, {"name":"total","hash":{},"data":data}) : helper)))
    + "'";
},"5":function(depth0,helpers,partials,data) {
  return "data-total='0'";
  },"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-max=\""
    + escapeExpression(((helper = helpers.maxItems || (depth0 && depth0.maxItems)),(typeof helper === functionType ? helper.call(depth0, {"name":"maxItems","hash":{},"data":data}) : helper)))
    + "\"";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.ref || (depth0 && depth0.ref)),(typeof helper === functionType ? helper.call(depth0, {"name":"ref","hash":{},"data":data}) : helper)))
    + "-";
},"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<input type=\"hidden\" name=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "_deathwatch\" id=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "_deathwatch\" />";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div id='group-many-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div id='group-many-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-content' class='sortable group-array-content' ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.total), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = ((helper = helpers.maxItems || (depth0 && depth0.maxItems)),(options={"name":"maxItems","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.maxItems) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = ((helper = helpers.minItems || (depth0 && depth0.minItems)),(options={"name":"minItems","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.minItems) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-src='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ref), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-__i__' data-deathwatch=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "_deathwatch\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deathwatch), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['startGroupHidden.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div id='group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style='display:none'><h2>"
    + escapeExpression(((helper = helpers.key || (depth0 && depth0.key)),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)))
    + "</h2>";
},"useData":true});
templates['startGroupItem.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ref), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.ref || (depth0 && depth0.ref)),(typeof helper === functionType ? helper.call(depth0, {"name":"ref","hash":{},"data":data}) : helper)))
    + "-";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div id='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mock), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class='group-item sort deep-"
    + escapeExpression(((helper = helpers.deep || (depth0 && depth0.deep)),(typeof helper === functionType ? helper.call(depth0, {"name":"deep","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "'>\n	<div class='row'>\n		<div class='group-item-sort'>\n			<div class='button sort-icon micro'><i class=\"fi-arrow-up\"></i><i class=\"fi-arrow-down\"></i></div>\n		</div>\n		<div class='group-item-content'>\n		<!-- CONTENT -->";
},"useData":true});
templates['startGroupNoMethod.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div id='group-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
},"useData":true});
templates['templates.js'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "(function() {\n  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};\n})();\n";
  },"useData":true});
templates['textarea.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<label for='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n<textarea name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" />"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "</textarea>";
},"useData":true});
templates['textfield.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<label for='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>";
  stack1 = ((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</label>";
},"2":function(depth0,helpers,partials,data) {
  return "<small>*required</small>";
  },"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "pattern=\""
    + escapeExpression(((helper = helpers.pattern || (depth0 && depth0.pattern)),(typeof helper === functionType ? helper.call(depth0, {"name":"pattern","hash":{},"data":data}) : helper)))
    + "\"";
},"6":function(depth0,helpers,partials,data) {
  return "required";
  },"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<small class=\"error\">"
    + escapeExpression(((helper = helpers.errorMsg || (depth0 && depth0.errorMsg)),(typeof helper === functionType ? helper.call(depth0, {"name":"errorMsg","hash":{},"data":data}) : helper)))
    + "</small>";
},"10":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"11":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.errorMsg), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(12, data),"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"12":function(depth0,helpers,partials,data) {
  return "<small class=\"error\">Required</small> ";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div class=\"textfield-holder\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<input type='text' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pattern), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pattern), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});
templates['upload.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"image-cluster\" id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<label for='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "'>"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</label>\n	<input type='file' name='"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "' id='"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "' value='"
    + escapeExpression(((helper = helpers.val || (depth0 && depth0.val)),(typeof helper === functionType ? helper.call(depth0, {"name":"val","hash":{},"data":data}) : helper)))
    + "' class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.form)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n</div>";
},"useData":true});
})();