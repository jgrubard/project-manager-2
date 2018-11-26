import React from 'react';

const Home = () => {
  return (
    <div>
      <div style={{ padding: '10', marginTop: '75px' }}>
        <h2>Project Manager</h2>
        { lorem.map((p, i) => <p style={{ margin: '10 0' }} key={i}>{p}</p>) }
      </div>
    </div>
  );
}

export default Home;

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis pulvinar magna, ut ullamcorper dui. Aenean sed erat ac odio imperdiet tempor sed eu est. Cras suscipit imperdiet eros, quis feugiat massa bibendum sit amet. Praesent porttitor, nisl ac mattis pretium, dui tortor imperdiet sem, vel lacinia velit orci blandit dolor. Duis id lectus at arcu sagittis gravida vitae ut diam. Vivamus sed quam sed tellus consectetur ornare a ut nunc. Nullam semper eleifend tristique. Vestibulum tempor vel magna sed consectetur. Nullam vulputate arcu et risus tincidunt, vel tristique mauris sollicitudin. Nam feugiat vitae tortor sed rhoncus. Duis varius quis lorem non euismod. Nulla eget tristique ipsum. Morbi molestie arcu quis eros pharetra, eu interdum mauris sagittis. Nulla sagittis ipsum eu mi viverra, ac venenatis nunc tristique. Donec faucibus viverra mattis.',

  'Pellentesque vehicula elementum mauris, ut mollis arcu. Cras id turpis sed quam mattis suscipit non efficitur nisi. Fusce odio orci, hendrerit at magna eu, vehicula condimentum lorem. Integer pulvinar felis id suscipit hendrerit. Vestibulum in venenatis augue. Aliquam tempor augue ac tellus blandit sollicitudin quis ac turpis. Mauris quis felis commodo ligula imperdiet mattis.',
  
  'Maecenas libero eros, cursus ac ullamcorper sit amet, malesuada id dui. Vestibulum tortor leo, commodo quis dolor vitae, posuere finibus massa. Donec a nulla elit. Vestibulum venenatis purus non felis dapibus sodales. Suspendisse efficitur, orci vitae aliquet tincidunt, justo ex placerat elit, sit amet dictum quam nibh a nulla. Nullam hendrerit dolor orci. Integer et euismod dui. Quisque elementum nunc a magna semper suscipit. Vestibulum odio sapien, facilisis non malesuada id, lacinia in magna. Nulla maximus luctus leo, in porttitor orci ornare sed. Suspendisse vitae feugiat enim, sed sollicitudin leo. Nam rutrum erat eget enim rutrum scelerisque. Cras viverra nibh et elementum aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  
  'Proin eget erat consequat, vulputate odio vitae, efficitur nibh. Suspendisse lacus magna, faucibus consequat ipsum nec, facilisis dictum neque. Praesent et eros enim. Etiam pulvinar sapien in turpis suscipit, ac interdum est viverra. Duis sed felis ut enim ornare ultricies nec lobortis turpis. Cras fermentum est nunc, sed iaculis felis lacinia in. Vestibulum auctor pellentesque sem, et dignissim nulla vehicula quis. Vivamus lobortis lorem sit amet sem consequat cursus. Aliquam dignissim quam id tincidunt ullamcorper. Sed sapien enim, pharetra in tristique ut, ornare eget nunc. Donec rhoncus vitae magna nec ultrices.',
  
  'Cras enim libero, sodales vel erat feugiat, semper venenatis arcu. Nam dictum blandit magna, non tristique urna efficitur ut. Duis tellus tortor, faucibus ac auctor vitae, eleifend non dui. Praesent vitae erat fermentum, cursus risus a, gravida enim. Maecenas ante arcu, sollicitudin nec tellus a, congue sollicitudin mauris. Vivamus eget mollis mauris. Nullam rutrum gravida porta. Nullam blandit tristique ex. Vivamus a mauris nec enim feugiat porttitor ut eget magna. Pellentesque at ante non magna porta porta. Quisque egestas fringilla neque, sed dapibus neque molestie eu. Aenean faucibus sollicitudin venenatis. Nam aliquam sollicitudin eleifend.',
  
  'Aenean gravida augue eget ipsum rutrum, sed pulvinar erat gravida. Donec blandit eu mi et mattis. Nullam ac consectetur velit. Praesent sed rhoncus ante. Aliquam erat volutpat. Nulla fermentum tempor mi, ullamcorper sodales nisl ultricies sit amet. Nullam sed iaculis augue. Suspendisse in fringilla tortor. Suspendisse eros lacus, faucibus id dolor pretium, placerat congue felis. Maecenas ut sagittis dolor. In molestie purus sed suscipit molestie.',
  
  'Mauris venenatis, lorem nec semper feugiat, nibh ipsum pulvinar lacus, at euismod leo arcu id sem. Suspendisse id sapien elit. Phasellus sed dignissim felis. Nam a sapien vel mi convallis aliquam. Nullam vel euismod nunc. Phasellus porta elit vestibulum fringilla vehicula. Morbi rutrum nisl ut tortor eleifend gravida. Integer sed facilisis quam.',
  
  'In rutrum massa nec libero eleifend, sit amet tincidunt quam lobortis. Pellentesque dapibus scelerisque justo id auctor. Nunc tempor facilisis justo, ut fermentum felis tincidunt nec. Aliquam egestas porta fringilla. Donec facilisis urna sapien. Mauris interdum sapien viverra libero facilisis pharetra. Donec in magna nec libero consectetur luctus quis eu est. Duis at vulputate tellus, in fringilla nisi. Curabitur commodo finibus rhoncus. Morbi euismod egestas odio, eget mattis quam egestas quis. Nam cursus velit a metus placerat, ac sodales sapien euismod. Morbi non leo quis nisl rutrum auctor. Duis tincidunt nisl ac sem lobortis sodales.',
  
  'Curabitur vitae porttitor libero. Duis facilisis ante vitae urna fringilla pellentesque. Donec arcu nisi, volutpat id faucibus eget, sollicitudin vitae augue. Morbi tristique, velit vel accumsan accumsan, tortor enim hendrerit ligula, eu interdum odio nunc sed est. Morbi aliquet maximus magna vitae posuere. Maecenas pellentesque ligula id auctor tempus. Nunc eget rhoncus orci. Aliquam erat volutpat.',

  'Fusce ac imperdiet sem. Aenean aliquet vel tortor auctor ullamcorper. Aliquam maximus suscipit mauris, sit amet tincidunt tortor convallis eu. Morbi consequat est vel maximus tincidunt. Sed eu dolor a velit tempor pulvinar. Cras vel leo vel mauris imperdiet gravida. Nam fringilla purus ut dignissim commodo. Sed dictum eu tellus consequat dictum. Fusce pharetra egestas nibh, vehicula dictum neque elementum et. Proin tincidunt commodo nulla id dapibus. Maecenas condimentum nunc vel ex consequat, venenatis cursus eros faucibus.'
];