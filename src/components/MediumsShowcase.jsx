const MEDIUMS = [
  {
    key: 'design',
    num: '01',
    label: 'DESIGN',
    img: '/creative-portfolio/assets/graphics/uwi-computing-join-the-stack.png',
    tags: ['BRANDS', 'INTERFACES', 'VISUALS'],
  },
  {
    key: 'photography',
    num: '02',
    label: 'PHOTO',
    img: '/creative-portfolio/assets/photography/dreamscape-villa-host-portrait.jpg',
    tags: ['MOMENTS', 'PEOPLE', 'PLACES'],
  },
  {
    key: 'video',
    num: '03',
    label: 'VIDEO',
    video: '/creative-portfolio/assets/video/video-clip-03.mp4',
    tags: ['STORIES', 'MOVEMENT', 'IMPACT'],
  },
  {
    key: 'social',
    num: '04',
    label: 'SOCIAL MEDIA',
    img: '/creative-portfolio/assets/graphics/social-media-page.jpeg',
    tags: ['AUDIENCES', 'COMMUNITY', 'CONNECTION'],
  },
];

export default function MediumsShowcase() {
  return (
    <div className="mediums-panels">
      {MEDIUMS.map((m) => (
        <div
          key={m.key}
          className="mediums-panel"
          style={m.video ? undefined : { backgroundImage: `url("${m.img}")` }}
        >
          {m.video ? (
            <video
              className="mediums-panel-video"
              src={m.video}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : null}
          <div className="mediums-panel-top">
            <span className="mediums-panel-num">{m.num}</span>
            <span className="mediums-panel-label">{m.label}</span>
          </div>
          <ul className="mediums-panel-tags">
            {m.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
