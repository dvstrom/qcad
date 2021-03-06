/**
 * Copyright (c) 2011-2013 by Andrew Mustun. All rights reserved.
 * 
 * This file is part of the QCAD project.
 *
 * QCAD is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QCAD is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with QCAD.
 */

include("../Point.js");

/**
 * \class Point1P
 * \brief Point from position.
 * \ingroup ecma_draw_point
 */
function Point1P(guiAction) {
    Point.call(this, guiAction);
}

Point1P.State = {
    SettingPosition : 0
};

Point1P.prototype = new Point();

Point1P.prototype.beginEvent = function() {
    Point.prototype.beginEvent.call(this);

    this.setState(Point1P.State.SettingPosition);
};

Point1P.prototype.setState = function(state) {
    Point.prototype.setState.call(this, state);

    this.setCrosshairCursor();
    this.getDocumentInterface().setClickMode(RAction.PickCoordinate);

    var appWin = RMainWindowQt.getMainWindow();
    var trPos = qsTr("Position");
    this.setCommandPrompt(trPos);
    this.setLeftMouseTip(trPos);
    this.setRightMouseTip(EAction.trCancel);
    EAction.showSnapTools();
};

Point1P.prototype.coordinateEvent = function(event) {
    var pos = event.getModelPosition();
    this.getDocumentInterface().setRelativeZero(pos);
    var point = new RPointEntity(
        this.getDocument(),
        new RPointData(pos)
    );
    var op = new RAddObjectOperation(point);
    this.getDocumentInterface().applyOperation(op);
};
