export const SwatchesPicker = ({ onChange, presetColors }) => {
    return (
      <div className="picker">
        <div className="picker__swatches">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className="picker__swatch"
              style={{ background: presetColor }}
              onClick={() => onChange(presetColor)}
            />
          ))}
        </div>
      </div>
    );
};