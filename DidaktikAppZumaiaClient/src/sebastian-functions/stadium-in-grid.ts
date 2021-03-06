import {Grid2dCssUnit} from './grid2d';
import {Segment2d} from './segment2d';
import {Vector2d, Vector2dCssUnit} from './vector2d';
import {CssDistanceUnit} from './css-distance-unit';

/**
 * The div element used to render a segment in the grid.
 */
export class StadiumInGrid {

  readonly span: HTMLSpanElement;

  /** The grid where the segment will be located. */
  private innerGrid: Grid2dCssUnit;

  /** Here we shall store the radius, calculated from {@link StadiumInGrid.grid} */
  private innerRadius: number;

  /** The position of itself on the grid */
  private innerSegment: Segment2d;

  private correct: boolean;


  constructor(g2dcu?: {
    start: Vector2dCssUnit;
    blankSpace: {length: number; unit: CssDistanceUnit};
    quantity: Vector2d;
  }) {
    this.correct = false;
    this.span = document.createElement('span');
    this.innerSegment = new Segment2d({
      start: new Vector2d(0, 0),
      end: new Vector2d(0, 0)
    });

    if (document.querySelectorAll('style').length === 0) {
      const style = document.createElement('style');
      style.textContent = `
        span {
          position: absolute;
          border: 2px solid black;
        }
      `;
      document.head.appendChild(style);
    }

    this.grid = new Grid2dCssUnit(g2dcu);
  }

  /** @returns The position of itself on the grid */
  get segment(): Segment2d {
    return this.innerSegment.copy();
  }

  /** @param segment - The future position of itself on the grid. */
  set segment(segment: Segment2d) {
    this.innerSegment = segment.copy();
    this.updateSegment();
  }

  get grid(): Grid2dCssUnit {
    return this.innerGrid.copy();
  }

  set grid(grid: Grid2dCssUnit) {
    this.innerGrid = grid.copy();
    this.innerRadius = 0.45 * this.innerGrid.blankSpace.length;
    if (this.segment) {
      this.innerSegment.bindAboveByVector(this.innerGrid.quantity);
    }
    this.updateAll();
  }

  private updateSegment() {
    this.innerSegment.roundPositionAndAngle();
    this.innerSegment.bindBelowByZero();
    if (this.innerGrid) {
      this.innerSegment.bindAboveByVector(this.innerGrid.quantity);
    }
    this.updateAll();
  }

  setCorrect() {
    this.correct = true;
    this.updateStyle();
  }

  private updateStyle(): void {
    this.span.style.cssText = `
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      pointer-events: none;
      touch-action: none;
      position: absolute;
      border: 3px solid black;
      z-index: 99;
      display: ${this.innerGrid && this.innerRadius || this.correct ? 'block' : 'none'};
      ${this.correct ? 'border-color: darkgreen;' : '' }
      ${this.innerGrid && this.innerRadius
        ?
          `
            transform-origin: ${
              this.innerRadius + this.innerGrid.blankSpace.unit
              + ' '
              + this.innerRadius + this.innerGrid.blankSpace.unit
            };
            border-radius: ${
              this.innerRadius + this.innerGrid.blankSpace.unit
            };
            height: ${
              2 * this.innerRadius + this.innerGrid.blankSpace.unit
            };
            ${this.innerSegment
              ?
                `
                  left: calc(
                    ${this.innerGrid.start.x + this.innerGrid.start.units.x}
                      + ${(this.innerGrid.blankSpace.length * this.innerSegment.start.x)
                        + this.innerGrid.blankSpace.unit});

                  top: calc(
                    ${this.innerGrid.start.y + this.innerGrid.start.units.y}
                      + ${(this.innerGrid.blankSpace.length * this.innerSegment.start.y)
                        + this.innerGrid.blankSpace.unit}
                  );

                  width: ${
                    this.innerSegment.length * this.innerGrid.blankSpace.length + 2 * this.innerRadius
                      + this.innerGrid.blankSpace.unit
                  };
                  transform: translate(
                    -${this.innerRadius}${this.innerGrid.blankSpace.unit},
                    -${this.innerRadius}${this.innerGrid.blankSpace.unit}
                  ) rotate(${Math.atan2(this.innerSegment.vector.y, this.innerSegment.vector.x)}rad);

                `
              :
                ''
            }
          `
        :
          ''
      }
    `;
  }

  private updateAll(): void {
    this.updateStyle();
  }
}
