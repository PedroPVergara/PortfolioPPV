export function BackgroundPattern() {
    // SVG pattern optimized: 84x95 tile size, single path shape
    const svgString = `<svg width='84' height='95' viewBox='0 0 84 95' xmlns='http://www.w3.org/2000/svg'>
    <path d='M34.5 0C53.554 0 69 15.446 69 34.5C69 53.554 53.554 69 34.5 69C15.446 69 0 53.554 0 34.5V0H34.5Z' fill='#192338' fill-opacity='0.35' transform='translate(7.5, 13)'/>
  </svg>`;

    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;

    return (
        <div className="absolute inset-0 z-[5] pointer-events-none mix-blend-soft-light opacity-60 [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]">
            <div
                className="w-full h-full bg-repeat"
                style={{
                    backgroundImage: `url("${dataUrl}")`,
                }}
            />
        </div>
    );
}
