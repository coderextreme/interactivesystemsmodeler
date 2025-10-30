import type { Domain } from '../types';
import { 
    CodeIcon, UserGroupIcon, CubeIcon, DatabaseIcon, HierarchyIcon, ChipIcon, BracketsIcon, ShapesIcon, AccessibilityIcon, GridIcon, CalendarIcon, BuildingIcon, CartIcon, FolderIcon, SkeletonIcon 
} from '../components/icons/Icons';

const softwareData = {
  nodes: [
    { id: 'app', name: 'Application', type: 'Entrypoint', val: 10, startTime: 0, description: 'The main application entry point.' },
    { id: 'moduleA', name: 'Auth Module', type: 'Module', val: 8, startTime: 10, description: 'Handles user authentication and authorization.' },
    { id: 'moduleB', name: 'API Module', type: 'Module', val: 8, startTime: 10, description: 'Provides the core API endpoints.' },
    { id: 'classA', name: 'User Class', type: 'Class', val: 5, startTime: 20, description: 'Represents a user entity.' },
    { id: 'classB', name: 'Product Class', type: 'Class', val: 5, startTime: 25, description: 'Represents a product entity.' },
    { id: 'funcA', name: 'login()', type: 'Function', val: 3, startTime: 30, description: 'Function to log a user in.' },
    { id: 'funcB', name: 'getProduct()', type: 'Function', val: 3, startTime: 35, description: 'Fetches product details.' },
    { id: 'db', name: 'Database', type: 'Persistence', val: 7, startTime: 5, description: 'The primary data store.' },
    { id: 'iface', name: 'Repository Interface', type: 'Interface', val: 4, startTime: 15, description: 'Abstracts data access logic.' },
    { id: 'var', name: 'API_KEY', type: 'Constant', val: 2, startTime: 40, description: 'Constant for external API key.' },
  ],
  links: [
    { source: 'app', target: 'moduleA' },
    { source: 'app', target: 'moduleB' },
    { source: 'moduleA', target: 'classA' },
    { source: 'moduleB', target: 'classB' },
    { source: 'classA', target: 'funcA' },
    { source: 'classB', target: 'funcB' },
    { source: 'moduleA', target: 'iface' },
    { source: 'moduleB', target: 'iface' },
    { source: 'iface', target: 'db' },
    { source: 'funcB', target: 'var' },
  ],
};

const hrData = {
  nodes: [
    { id: 'employer', name: 'Tech Corp', type: 'Employer', val: 10, startTime: 0, description: 'The hiring company.' },
    { id: 'recruit', name: 'Recruiting Dept', type: 'Department', val: 8, startTime: 10, description: 'Manages the hiring process.' },
    { id: 'projA', name: 'Project Phoenix', type: 'Project', val: 7, startTime: 5, description: 'A major ongoing project.' },
    { id: 'emp1', name: 'Alice', type: 'Employee', val: 5, startTime: 50, description: 'A senior software engineer.' },
    { id: 'emp2', name: 'Bob', type: 'Employee', val: 5, startTime: 60, description: 'A project manager.' },
    { id: 'cand1', name: 'Charlie', type: 'Candidate', val: 4, startTime: 20, description: 'A candidate for an engineering role.' },
    { id: 'resume1', name: 'Charlie\'s Resume', type: 'Document', val: 3, startTime: 25, description: 'Details Charlie\'s qualifications.' },
    { id: 'interview1', name: 'Technical Interview', type: 'Meeting', val: 4, startTime: 35, description: 'Technical screening for Charlie.' },
    { id: 'offer', name: 'Job Offer', type: 'Document', val: 3, startTime: 45, description: 'Official job offer sent to Charlie.' },
  ],
  links: [
    { source: 'employer', target: 'recruit' },
    { source: 'employer', target: 'projA' },
    { source: 'recruit', target: 'cand1' },
    { source: 'cand1', target: 'resume1' },
    { source: 'recruit', target: 'interview1' },
    { source: 'cand1', target: 'interview1' },
    { source: 'interview1', target: 'offer' },
    { source: 'offer', target: 'emp1' },
    { source: 'projA', target: 'emp1' },
    { source: 'projA', target: 'emp2' },
  ],
};

const plmData = {
    nodes: [
        { id: 'product', name: 'Drone Model X', type: 'Product', val: 10, startTime: 0, description: 'A new generation commercial drone.' },
        { id: 'req', name: 'Requirements', type: 'Collection', val: 8, startTime: 10, description: 'The set of all product requirements.' },
        { id: 'req1', name: 'Flight Time > 30min', type: 'Requirement', val: 4, startTime: 15, description: 'Must have a flight time exceeding 30 minutes.' },
        { id: 'req2', name: '4K Camera', type: 'Requirement', val: 4, startTime: 20, description: 'Must include a 4K resolution camera.' },
        { id: 'design', name: 'Mechanical Design', type: 'Model', val: 7, startTime: 25, description: '3D CAD models of the drone body.' },
        { id: 'bom', name: 'Bill of Materials', type: 'Document', val: 6, startTime: 40, description: 'List of all parts and components.' },
        { id: 'test', name: 'Wind Tunnel Test', type: 'Test', val: 5, startTime: 55, description: 'Aerodynamic stability testing.' },
        { id: 'release', name: 'Version 1.0 Release', type: 'Release', val: 8, startTime: 80, description: 'The first official product release.' },
        { id: 'mfg', name: 'Manufacturing', type: 'Process', val: 7, startTime: 65, description: 'The manufacturing and assembly process.' },
    ],
    links: [
        { source: 'product', target: 'req' },
        { source: 'req', target: 'req1' },
        { source: 'req', target: 'req2' },
        { source: 'req1', target: 'design' },
        { source: 'req2', target: 'design' },
        { source: 'design', target: 'bom' },
        { source: 'design', target: 'test' },
        { source: 'bom', target: 'mfg' },
        { source: 'mfg', target: 'release' },
        { source: 'product', target: 'release' },
    ],
};

const assetManagementData = {
    nodes: [
        { id: 'asset_manager', name: 'Asset Manager', type: 'System', val: 10, startTime: 0, description: 'Central system for managing 3D assets.' },
        { id: 'humanoid_model', name: 'Humanoid Model', type: '3DModel', val: 8, startTime: 10, description: 'A complete humanoid character model.' },
        { id: 'non_humanoid_model', name: 'Dragon Model', type: '3DModel', val: 8, startTime: 15, description: 'A non-humanoid creature model.' },
        { id: 'skeleton', name: 'Rig/Skeleton', type: 'Skeleton', val: 6, startTime: 20, description: 'The armature for animation.' },
        { id: 'mesh', name: '3D Mesh', type: 'Geometry', val: 5, startTime: 25, description: 'The polygonal geometry of the model.' },
        { id: 'texture', name: 'Texture Map', type: 'Texture', val: 4, startTime: 30, description: 'Surface color and material properties.' },
        { id: 'animation', name: 'Walk Cycle', type: 'Animation', val: 5, startTime: 40, description: 'A transportable walking animation.' },
    ],
    links: [
        { source: 'asset_manager', target: 'humanoid_model' },
        { source: 'asset_manager', target: 'non_humanoid_model' },
        { source: 'humanoid_model', target: 'skeleton' },
        { source: 'humanoid_model', target: 'mesh' },
        { source: 'non_humanoid_model', target: 'mesh' },
        { source: 'mesh', target: 'texture' },
        { source: 'skeleton', target: 'animation' },
    ],
};

const humanoidSkeletonData = {
    nodes: [
        // Joints
        { id: 'humanoid_root', name: 'HumanoidRoot', type: 'HAnimJoint', val: 10, startTime: 0, description: 'The root of the humanoid skeleton hierarchy.' },
        { id: 'sacroiliac', name: 'sacroiliac', type: 'HAnimJoint', val: 9, startTime: 2, description: 'The joint connecting the sacrum and iliac bones.' },
        ...[...Array(5)].map((_, i) => ({ id: `vl${5 - i}`, name: `vl${5 - i}`, type: 'HAnimJoint', val: 7, startTime: 5 + i, description: `${5 - i}th lumbar vertebra joint.` })),
        ...[...Array(12)].map((_, i) => ({ id: `vt${12 - i}`, name: `vt${12 - i}`, type: 'HAnimJoint', val: 7, startTime: 10 + i, description: `${12 - i}th thoracic vertebra joint.` })),
        ...[...Array(7)].map((_, i) => ({ id: `vc${7 - i}`, name: `vc${7 - i}`, type: 'HAnimJoint', val: 7, startTime: 22 + i, description: `${7 - i}th cervical vertebra joint.` })),
        { id: 'skullbase', name: 'skullbase', type: 'HAnimJoint', val: 8, startTime: 29, description: 'Joint where the skull connects to the spine.' },
        { id: 'l_eyelid_joint', name: 'l_eyelid_joint', type: 'HAnimJoint', val: 2, startTime: 31, description: 'Left eyelid joint.' },
        { id: 'r_eyelid_joint', name: 'r_eyelid_joint', type: 'HAnimJoint', val: 2, startTime: 31, description: 'Right eyelid joint.' },
        { id: 'l_eyeball_joint', name: 'l_eyeball_joint', type: 'HAnimJoint', val: 2, startTime: 32, description: 'Left eyeball joint.' },
        { id: 'r_eyeball_joint', name: 'r_eyeball_joint', type: 'HAnimJoint', val: 2, startTime: 32, description: 'Right eyeball joint.' },
        { id: 'l_eyebrow_joint', name: 'l_eyebrow_joint', type: 'HAnimJoint', val: 2, startTime: 33, description: 'Left eyebrow joint.' },
        { id: 'r_eyebrow_joint', name: 'r_eyebrow_joint', type: 'HAnimJoint', val: 2, startTime: 33, description: 'Right eyebrow joint.' },
        { id: 'temporomandibular', name: 'temporomandibular', type: 'HAnimJoint', val: 4, startTime: 34, description: 'Temporomandibular joint.' },

        ...['l', 'r'].flatMap(side => [
            ...[...Array(12)].map((_, i) => ({ id: `${side}_costovertebral_${i + 1}`, name: `${side}_costovertebral_${i + 1}`, type: 'HAnimJoint', val: 4, startTime: 11 + i, description: `Costovertebral joint for rib ${i + 1} (${side}).` })),
            { id: `${side}_sternoclavicular`, name: `${side}_sternoclavicular`, type: 'HAnimJoint', val: 5, startTime: 23, description: `Sternoclavicular joint (${side}).` },
            { id: `${side}_acromioclavicular`, name: `${side}_acromioclavicular`, type: 'HAnimJoint', val: 5, startTime: 25, description: `Acromioclavicular joint (${side}).` },
            { id: `${side}_shoulder`, name: `${side}_shoulder`, type: 'HAnimJoint', val: 8, startTime: 27, description: `Shoulder joint (${side}).` },
            { id: `${side}_elbow`, name: `${side}_elbow`, type: 'HAnimJoint', val: 7, startTime: 35, description: `Elbow joint (${side}).` },
            { id: `${side}_radiocarpal`, name: `${side}_radiocarpal`, type: 'HAnimJoint', val: 6, startTime: 42, description: `Radiocarpal (wrist) joint (${side}).` },
            ...[...Array(5)].map((_, i) => ({ id: `${side}_metacarpophalangeal_${i + 1}`, name: `${side}_mcp_${i + 1}`, type: 'HAnimJoint', val: 3, startTime: 50 + i, description: `Metacarpophalangeal joint ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_proximal_interphalangeal_${i + 1}`, name: `${side}_pip_${i + 1}`, type: 'HAnimJoint', val: 2.5, startTime: 60 + i, description: `Proximal Interphalangeal joint ${i + 1} (${side}).` })),
            ...[...Array(4)].map((_, i) => ({ id: `${side}_distal_interphalangeal_${i + 2}`, name: `${side}_dip_${i + 2}`, type: 'HAnimJoint', val: 2, startTime: 70 + i, description: `Distal Interphalangeal joint ${i + 2} (${side}).` })),
            { id: `${side}_hip`, name: `${side}_hip`, type: 'HAnimJoint', val: 8, startTime: 4, description: `Hip joint (${side}).` },
            { id: `${side}_knee`, name: `${side}_knee`, type: 'HAnimJoint', val: 7, startTime: 15, description: `Knee joint (${side}).` },
            { id: `${side}_talocrural`, name: `${side}_talocrural`, type: 'HAnimJoint', val: 6, startTime: 28, description: `Talocrural (ankle) joint (${side}).` },
            { id: `${side}_subtalar`, name: `${side}_subtalar`, type: 'HAnimJoint', val: 5, startTime: 30, description: `Subtalar joint (${side}).` },
            ...[...Array(5)].map((_, i) => ({ id: `${side}_metatarsophalangeal_${i + 1}`, name: `${side}_mtp_${i + 1}`, type: 'HAnimJoint', val: 3, startTime: 40 + i, description: `Metatarsophalangeal joint ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_proximal_interphalangeal_toe_${i + 1}`, name: `${side}_pip_toe_${i + 1}`, type: 'HAnimJoint', val: 2.5, startTime: 50 + i, description: `Toe Proximal Interphalangeal joint ${i + 1} (${side}).` })),
            ...[...Array(4)].map((_, i) => ({ id: `${side}_distal_interphalangeal_toe_${i + 2}`, name: `${side}_dip_toe_${i + 2}`, type: 'HAnimJoint', val: 2, startTime: 60 + i, description: `Toe Distal Interphalangeal joint ${i + 2} (${side}).` })),
        ]),

        // Segments
        { id: 'pelvis', name: 'pelvis', type: 'HAnimSegment', val: 12, startTime: 3, description: 'The pelvic bone structure segment.' },
        { id: 'sacrum', name: 'sacrum', type: 'HAnimSegment', val: 8, startTime: 4, description: 'The sacrum segment.' },
        { id: 'skull', name: 'skull', type: 'HAnimSegment', val: 10, startTime: 30, description: 'The skull segment.'},
        { id: 'mandible', name: 'mandible', type: 'HAnimSegment', val: 5, startTime: 35, description: 'The mandible (lower jaw) segment.'},
        { id: 'hyoid', name: 'hyoid', type: 'HAnimSegment', val: 3, startTime: 36, description: 'The hyoid bone segment.'},
        ...['l', 'r'].flatMap(side => [
            { id: `${side}_clavicle`, name: `${side}_clavicle`, type: 'HAnimSegment', val: 6, startTime: 24, description: `Clavicle segment (${side}).` },
            { id: `${side}_scapula`, name: `${side}_scapula`, type: 'HAnimSegment', val: 7, startTime: 26, description: `Scapula segment (${side}).` },
            ...[...Array(12)].map((_, i) => ({ id: `${side}_rib_${i + 1}`, name: `${side}_rib_${i + 1}`, type: 'HAnimSegment', val: 3, startTime: 12 + i, description: `Rib segment ${i + 1} (${side}).` })),
            { id: `${side}_humerus`, name: `${side}_humerus`, type: 'HAnimSegment', val: 9, startTime: 30, description: `Humerus segment (${side}).` },
            { id: `${side}_radius`, name: `${side}_radius`, type: 'HAnimSegment', val: 7, startTime: 38, description: `Radius forearm segment (${side}).` },
            { id: `${side}_ulna`, name: `${side}_ulna`, type: 'HAnimSegment', val: 7, startTime: 38, description: `Ulna forearm segment (${side}).` },
            ...['scaphoid', 'lunate', 'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'].map((carpal, i) => ({ id: `${side}_${carpal}`, name: `${side}_${carpal}`, type: 'HAnimSegment', val: 2, startTime: 44 + i*0.5, description: `${carpal} carpal bone (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_metacarpal_${i + 1}`, name: `${side}_metacarpal_${i + 1}`, type: 'HAnimSegment', val: 2.5, startTime: 48 + i, description: `Metacarpal ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_proximal_phalanx_${i + 1}`, name: `${side}_proximal_phalanx_${i + 1}`, type: 'HAnimSegment', val: 2, startTime: 58 + i, description: `Proximal phalanx ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_middle_phalanx_${i + 1}`, name: `${side}_middle_phalanx_${i + 1}`, type: 'HAnimSegment', val: 1.5, startTime: 68 + i, description: `Middle phalanx ${i + 1} (${side}).` })),
            ...[...Array(4)].map((_, i) => ({ id: `${side}_distal_phalanx_${i + 2}`, name: `${side}_distal_phalanx_${i + 2}`, type: 'HAnimSegment', val: 1, startTime: 78 + i, description: `Distal phalanx ${i + 2} (${side}).` })),
            { id: `${side}_femur`, name: `${side}_femur`, type: 'HAnimSegment', val: 10, startTime: 8, description: `Femur segment (${side}).` },
            { id: `${side}_patella`, name: `${side}_patella`, type: 'HAnimSegment', val: 4, startTime: 16, description: `Patella segment (${side}).` },
            { id: `${side}_tibia`, name: `${side}_tibia`, type: 'HAnimSegment', val: 9, startTime: 20, description: `Tibia (shin) segment (${side}).` },
            { id: `${side}_fibula`, name: `${side}_fibula`, type: 'HAnimSegment', val: 7, startTime: 21, description: `Fibula segment (${side}).` },
            ...['talus', 'calcaneus', 'navicular', 'cuboid', 'medial_cuneiform', 'intermediate_cuneiform', 'lateral_cuneiform'].map((tarsal, i) => ({ id: `${side}_${tarsal}`, name: `${side}_${tarsal}`, type: 'HAnimSegment', val: 3, startTime: 32 + i*0.5, description: `${tarsal} tarsal bone (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_metatarsal_${i + 1}`, name: `${side}_metatarsal_${i + 1}`, type: 'HAnimSegment', val: 2.5, startTime: 38 + i, description: `Metatarsal ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_proximal_phalanx_toe_${i + 1}`, name: `${side}_proximal_phalanx_toe_${i + 1}`, type: 'HAnimSegment', val: 2, startTime: 48 + i, description: `Toe Proximal phalanx ${i + 1} (${side}).` })),
            ...[...Array(5)].map((_, i) => ({ id: `${side}_middle_phalanx_toe_${i + 1}`, name: `${side}_middle_phalanx_toe_${i + 1}`, type: 'HAnimSegment', val: 1.5, startTime: 58 + i, description: `Toe Middle phalanx ${i + 1} (${side}).` })),
            ...[...Array(4)].map((_, i) => ({ id: `${side}_distal_phalanx_toe_${i + 2}`, name: `${side}_distal_phalanx_toe_${i + 2}`, type: 'HAnimSegment', val: 1, startTime: 68 + i, description: `Toe Distal phalanx ${i + 2} (${side}).` })),
        ]),
        
        // Sites
        ...['glabella', 'opisthocranion', 'nasion', 'sellion', 'substernale', 'suprasternale', 'cervicale', 'vl5_pt', 'vt12_pt', 'vc7_pt'].map((name, i) => ({ id: name, name: name, type: 'HAnimSite', val: 1, startTime: 80 + i, description: `Anatomical site: ${name}.`})),
        ...['l', 'r'].flatMap(side => [
            'acromion', 'axilla_posterior', 'axilla_anterior', 'iliocristale', 'trochanterion', 'radiale', 'stylion', 'metacarpal_phalanx_2', 'metacarpal_phalanx_5',
            'femur_lateral_epicondyle', 'femur_medial_epicondyle', 'tibia_lateral_epicondyle', 'tibia_medial_epicondyle', 'lateral_malleolus', 'medial_malleolus', 'sphyrion',
            'metatarsal_phalangeal_1', 'metatarsal_phalangeal_5', 'calcaneus_posterior', 'acropodion'
        ].map((name, i) => ({ id: `${side}_${name}`, name: `${side}_${name}`, type: 'HAnimSite', val: 1, startTime: 85 + i, description: `Anatomical site: ${name} (${side}).` })))
    ],
    links: [
        // Spine
        { source: 'humanoid_root', target: 'sacroiliac' },
        { source: 'sacroiliac', target: 'pelvis' },
        { source: 'sacroiliac', target: 'sacrum' },
        { source: 'sacrum', target: 'vl5' },
        ...[...Array(4)].map((_, i) => ({ source: `vl${5 - i}`, target: `vl${4 - i}` })),
        { source: 'vl1', target: 'vt12' },
        ...[...Array(11)].map((_, i) => ({ source: `vt${12 - i}`, target: `vt${11 - i}` })),
        { source: 'vt1', target: 'vc7' },
        ...[...Array(6)].map((_, i) => ({ source: `vc${7 - i}`, target: `vc${6 - i}` })),
        { source: 'vc1', target: 'skullbase' },

        // Head
        { source: 'skullbase', target: 'skull' },
        { source: 'skull', target: 'temporomandibular' },
        { source: 'temporomandibular', target: 'mandible' },
        { source: 'vc4', target: 'hyoid'}, // Approximate anatomical position
        ...['l', 'r'].flatMap(side => [
             { source: 'skull', target: `${side}_eyelid_joint` },
             { source: 'skull', target: `${side}_eyeball_joint` },
             { source: 'skull', target: `${side}_eyebrow_joint` },
        ]),

        // Ribs, Clavicle, Scapula
        ...['l', 'r'].flatMap(side => [
            ...[...Array(12)].map((_, i) => ({ source: `vt${i + 1}`, target: `${side}_costovertebral_${i + 1}` })),
            ...[...Array(12)].map((_, i) => ({ source: `${side}_costovertebral_${i + 1}`, target: `${side}_rib_${i + 1}` })),
            { source: 'vt1', target: `${side}_sternoclavicular` },
            { source: `${side}_sternoclavicular`, target: `${side}_clavicle` },
            { source: `${side}_clavicle`, target: `${side}_acromioclavicular` },
            { source: `${side}_acromioclavicular`, target: `${side}_scapula` },
            { source: `${side}_scapula`, target: `${side}_shoulder` },
        ]),
        
        // Arms and Hands
        ...['l', 'r'].flatMap(side => [
            { source: `${side}_shoulder`, target: `${side}_humerus` },
            { source: `${side}_humerus`, target: `${side}_elbow` },
            { source: `${side}_elbow`, target: `${side}_radius` },
            { source: `${side}_elbow`, target: `${side}_ulna` },
            { source: `${side}_radius`, target: `${side}_radiocarpal` },
            { source: `${side}_ulna`, target: `${side}_radiocarpal` },
            { source: `${side}_radiocarpal`, target: `${side}_scaphoid`},
            { source: `${side}_radiocarpal`, target: `${side}_lunate`},
            ...['scaphoid', 'lunate', 'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'].map(carpal => ({source: `${side}_radiocarpal`, target: `${side}_${carpal}`})),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_trapezium`, target: `${side}_metacarpal_${i + 1}` })), // simplified carpal->metacarpal links
            ...[...Array(5)].map((_, i) => ({ source: `${side}_metacarpal_${i + 1}`, target: `${side}_metacarpophalangeal_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_metacarpophalangeal_${i + 1}`, target: `${side}_proximal_phalanx_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_proximal_phalanx_${i + 1}`, target: `${side}_proximal_interphalangeal_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_proximal_interphalangeal_${i + 1}`, target: `${side}_middle_phalanx_${i + 1}` })),
            ...[...Array(4)].map((_, i) => ({ source: `${side}_middle_phalanx_${i + 2}`, target: `${side}_distal_interphalangeal_${i + 2}` })),
            ...[...Array(4)].map((_, i) => ({ source: `${side}_distal_interphalangeal_${i + 2}`, target: `${side}_distal_phalanx_${i + 2}` })),
        ]),

        // Legs and Feet
        ...['l', 'r'].flatMap(side => [
            { source: 'pelvis', target: `${side}_hip` },
            { source: `${side}_hip`, target: `${side}_femur` },
            { source: `${side}_femur`, target: `${side}_knee` },
            { source: `${side}_knee`, target: `${side}_patella` },
            { source: `${side}_knee`, target: `${side}_tibia` },
            { source: `${side}_tibia`, target: `${side}_fibula` },
            { source: `${side}_tibia`, target: `${side}_talocrural` },
            { source: `${side}_fibula`, target: `${side}_talocrural` },
            { source: `${side}_talocrural`, target: `${side}_talus` },
            { source: `${side}_talus`, target: `${side}_subtalar` },
            { source: `${side}_subtalar`, target: `${side}_calcaneus` },
            ...['talus', 'calcaneus', 'navicular', 'cuboid', 'medial_cuneiform', 'intermediate_cuneiform', 'lateral_cuneiform'].map(tarsal => ({source: `${side}_talocrural`, target: `${side}_${tarsal}`})),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_cuboid`, target: `${side}_metatarsal_${i + 1}` })), // simplified tarsal->metatarsal links
            ...[...Array(5)].map((_, i) => ({ source: `${side}_metatarsal_${i + 1}`, target: `${side}_metatarsophalangeal_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_metatarsophalangeal_${i + 1}`, target: `${side}_proximal_phalanx_toe_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_proximal_phalanx_toe_${i + 1}`, target: `${side}_proximal_interphalangeal_toe_${i + 1}` })),
            ...[...Array(5)].map((_, i) => ({ source: `${side}_proximal_interphalangeal_toe_${i + 1}`, target: `${side}_middle_phalanx_toe_${i + 1}` })),
            ...[...Array(4)].map((_, i) => ({ source: `${side}_middle_phalanx_toe_${i + 2}`, target: `${side}_distal_interphalangeal_toe_${i + 2}` })),
            ...[...Array(4)].map((_, i) => ({ source: `${side}_distal_interphalangeal_toe_${i + 2}`, target: `${side}_distal_phalanx_toe_${i + 2}` })),
        ]),

        // Sites to Segments
        { source: 'skull', target: 'glabella' }, { source: 'skull', target: 'opisthocranion' }, { source: 'skull', target: 'nasion' }, { source: 'skull', target: 'sellion' },
        { source: 'vc7', target: 'cervicale' }, { source: 'vl5', target: 'vl5_pt' }, { source: 'vt12', target: 'vt12_pt' },
        ...['l', 'r'].flatMap(side => [
            { source: `${side}_scapula`, target: `${side}_acromion` },
            { source: 'pelvis', target: `${side}_iliocristale` },
            { source: `${side}_femur`, target: `${side}_trochanterion` },
            { source: `${side}_humerus`, target: `${side}_radiale` },
            { source: `${side}_radius`, target: `${side}_stylion` },
            { source: `${side}_femur`, target: `${side}_femur_lateral_epicondyle` },
            { source: `${side}_femur`, target: `${side}_femur_medial_epicondyle` },
            { source: `${side}_tibia`, target: `${side}_tibia_lateral_epicondyle` },
            { source: `${side}_tibia`, target: `${side}_tibia_medial_epicondyle` },
            { source: `${side}_fibula`, target: `${side}_lateral_malleolus` },
            { source: `${side}_tibia`, target: `${side}_medial_malleolus` },
            { source: `${side}_tibia`, target: `${side}_sphyrion` },
            { source: `${side}_calcaneus`, target: `${side}_calcaneus_posterior` },
        ]),
    ],
};

const knowledgeGraphData = {
    nodes: [
        { id: 'central_concept', name: 'Information Modeling', type: 'CentralConcept', val: 10, startTime: 0, description: 'The central idea of the mind map.' },
        { id: 'semantic_networks', name: 'Semantic Networks', type: 'MainTopic', val: 8, startTime: 10, description: 'Represents relationships between concepts.' },
        { id: 'knowledge_graphs', name: 'Knowledge Graphs', type: 'MainTopic', val: 8, startTime: 15, description: 'Structured knowledge base with interlinked entities.' },
        { id: 'mind_maps', name: 'Mind Maps', type: 'MainTopic', val: 8, startTime: 20, description: 'Hierarchical diagrams to visually organize information.' },
        { id: 'nodes_links', name: 'Nodes & Links', type: 'SubTopic', val: 5, startTime: 30, description: 'Core components of graph structures.' },
        { id: 'ontology', name: 'Ontology', type: 'RelatedIdea', val: 4, startTime: 40, description: 'A formal naming and definition of the types, properties, and interrelationships of the entities.' },
    ],
    links: [
        { source: 'central_concept', target: 'semantic_networks' },
        { source: 'central_concept', target: 'knowledge_graphs' },
        { source: 'central_concept', target: 'mind_maps' },
        { source: 'semantic_networks', target: 'nodes_links' },
        { source: 'knowledge_graphs', target: 'nodes_links' },
        { source: 'knowledge_graphs', target: 'ontology' },
    ],
};

const databaseModelingData = {
    nodes: [
        { id: 'ddl_script', name: 'SQL DDL', type: 'Script', val: 10, startTime: 0, description: 'Data Definition Language script to create tables.' },
        { id: 'users_table', name: 'Users Table', type: 'EntityType', val: 8, startTime: 10, description: 'Stores user information.' },
        { id: 'posts_table', name: 'Posts Table', type: 'EntityType', val: 8, startTime: 20, description: 'Stores blog posts.' },
        { id: 'user_id', name: 'user_id (PK)', type: 'Attribute', val: 5, startTime: 15, description: 'Primary Key for the Users table.' },
        { id: 'post_id', name: 'post_id (PK)', type: 'Attribute', val: 5, startTime: 25, description: 'Primary Key for the Posts table.' },
        { id: 'fk_user_post', name: 'user_id (FK)', type: 'Relationship', val: 6, startTime: 35, description: 'Foreign Key in Posts linking to Users.' },
    ],
    links: [
        { source: 'ddl_script', target: 'users_table' },
        { source: 'ddl_script', target: 'posts_table' },
        { source: 'users_table', target: 'user_id' },
        { source: 'posts_table', target: 'post_id' },
        { source: 'posts_table', target: 'fk_user_post' },
        { source: 'fk_user_post', target: 'users_table' },
    ],
};

const ecommerceData = {
    nodes: [
        { id: 'shopping_cart', name: 'Shopping Cart', type: 'SessionObject', val: 10, startTime: 0, description: 'Manages selected products for purchase.' },
        { id: 'product_page', name: 'Product Page', type: 'Interface', val: 8, startTime: 10, description: 'Displays a single product for selection.' },
        { id: 'inventory_db', name: 'Inventory DB', type: 'Persistence', val: 7, startTime: 5, description: 'Tracks product stock levels.' },
        { id: 'product_config', name: 'Product Configurator', type: 'Tool', val: 6, startTime: 20, description: 'Allows users to customize products.' },
        { id: 'product_filter', name: 'Product Filtering', type: 'Feature', val: 6, startTime: 15, description: 'Narrows down product selection based on criteria.' },
        { id: 'payment_gateway', name: 'Payment Gateway', type: 'Service', val: 7, startTime: 30, description: 'Handles the financial transaction.' },
    ],
    links: [
        { source: 'product_filter', target: 'product_page' },
        { source: 'product_page', target: 'product_config' },
        { source: 'product_page', target: 'shopping_cart' },
        { source: 'product_page', target: 'inventory_db' },
        { source: 'shopping_cart', target: 'payment_gateway' },
    ],
};

const hardwareDesignData = {
    nodes: [
        { id: 'fpga', name: 'FPGA', type: 'Chip', val: 10, startTime: 0, description: 'Field-Programmable Gate Array.' },
        { id: 'clb', name: 'Configurable Logic Block', type: 'Component', val: 7, startTime: 10, description: 'Performs logic operations.' },
        { id: 'io_pad', name: 'I/O Pad', type: 'Interface', val: 5, startTime: 20, description: 'Connects the chip to external pins.' },
        { id: 'routing', name: 'Routing Channels', type: 'Network', val: 6, startTime: 15, description: 'Programmable interconnects.' },
        { id: 'impact_proc', name: 'IMPACT Processor', type: 'Architecture', val: 8, startTime: 30, description: 'A conceptual processor architecture for the FPGA.' },
        { id: 'circuit_layout', name: 'Circuit Layout', type: 'Design', val: 7, startTime: 40, description: 'The physical layout of components.' },
    ],
    links: [
        { source: 'fpga', target: 'clb' },
        { source: 'fpga', target: 'io_pad' },
        { source: 'fpga', target: 'routing' },
        { source: 'routing', target: 'clb' },
        { source: 'routing', target: 'io_pad' },
        { source: 'impact_proc', target: 'clb' },
        { source: 'fpga', target: 'circuit_layout' },
    ],
};

const grammarData = {
    nodes: [
        { id: 'grammar', name: 'Grammar', type: 'System', val: 10, startTime: 0, description: 'The set of production rules for a language.' },
        { id: 'production_rule', name: 'Production Rule', type: 'Rule', val: 8, startTime: 10, description: 'Defines how to form strings.' },
        { id: 'non_terminal', name: 'Non-terminal', type: 'Symbol', val: 6, startTime: 20, description: 'A symbol that can be replaced.' },
        { id: 'terminal', name: 'Terminal', type: 'Symbol', val: 4, startTime: 30, description: 'A final symbol that cannot be replaced (a word).' },
        { id: 'bnf', name: 'Backus-Naur Form', type: 'Notation', val: 7, startTime: 40, description: 'A formal notation for context-free grammars.' },
        { id: 'syntax_diagram', name: 'Syntax Diagram', type: 'Visualization', val: 7, startTime: 50, description: 'A graphical representation of production rules (railroad diagram).' },
    ],
    links: [
        { source: 'grammar', target: 'production_rule' },
        { source: 'grammar', target: 'bnf' },
        { source: 'production_rule', target: 'non_terminal' },
        { source: 'production_rule', target: 'terminal' },
        { source: 'bnf', target: 'production_rule' },
        { source: 'syntax_diagram', target: 'production_rule' },
    ],
};

const osData = {
    nodes: [
        { id: 'os', name: 'Operating System', type: 'System', val: 10, startTime: 0, description: 'Core software managing hardware and software resources.' },
        { id: 'file_system', name: 'File System', type: 'Manager', val: 8, startTime: 10, description: 'Controls how data is stored and retrieved.' },
        { id: 'windowing_system', name: 'Windowing System', type: 'Manager', val: 8, startTime: 15, description: 'Manages windows and GUI.' },
        { id: 'dom', name: 'Document Object Model', type: 'ObjectModel', val: 7, startTime: 25, description: 'A programming interface for web documents.' },
        { id: 'file_browser', name: 'File Browser', type: 'Application', val: 6, startTime: 20, description: 'Navigates the file system.' },
        { id: 'data_structure', name: 'Data Structures', type: 'Concept', val: 5, startTime: 35, description: 'Fundamental constructs like trees and lists used by the OS.' },
    ],
    links: [
        { source: 'os', target: 'file_system' },
        { source: 'os', target: 'windowing_system' },
        { source: 'os', target: 'data_structure' },
        { source: 'file_system', target: 'file_browser' },
        { source: 'windowing_system', target: 'dom' },
    ],
};

const realEstateData = {
    nodes: [
        { id: 'real_estate_market', name: 'Real Estate Market', type: 'System', val: 10, startTime: 0, description: 'Market for property transactions.' },
        { id: 'apartment', name: 'Apartment Building', type: 'Property', val: 8, startTime: 10, description: 'A residential building with multiple units.' },
        { id: 'hotel', name: 'Hotel', type: 'Property', val: 8, startTime: 15, description: 'Provides paid lodging on a short-term basis.' },
        { id: 'mortgage', name: 'Mortgage Loan', type: 'Finance', val: 7, startTime: 20, description: 'A loan used to purchase real estate.' },
        { id: 'rental', name: 'Rental Unit', type: 'Leaseable', val: 6, startTime: 25, description: 'An apartment or house for rent.' },
        { id: 'meeting_room', name: 'Meeting Room', type: 'Leaseable', val: 5, startTime: 30, description: 'Space leased for business meetings.' },
        { id: 'space_leasing', name: 'Space Leasing', type: 'Service', val: 6, startTime: 35, description: 'The act of renting out property.' },
    ],
    links: [
        { source: 'real_estate_market', target: 'apartment' },
        { source: 'real_estate_market', target: 'hotel' },
        { source: 'apartment', target: 'mortgage' },
        { source: 'apartment', target: 'rental' },
        { source: 'hotel', target: 'meeting_room' },
        { source: 'space_leasing', target: 'rental' },
        { source: 'space_leasing', target: 'meeting_room' },
    ],
};

const accessibleIdeData = {
    nodes: [
        { id: 'ide_core', name: 'IDE Core', type: 'Core', val: 10, startTime: 0, description: 'The central text editor and logic for a Deaf-blind IDE.' },
        { id: 'screen_reader', name: 'Screen Reader', type: 'Output', val: 8, startTime: 10, description: 'Translates on-screen information to speech or Braille.' },
        { id: 'braille_display', name: 'Braille Display', type: 'Output', val: 8, startTime: 15, description: 'A tactile device that displays Braille characters.' },
        { id: 'haptic_feedback', name: 'Haptic Feedback', type: 'Output', val: 7, startTime: 25, description: 'Uses touch to communicate events like errors or breakpoints.' },
        { id: 'voice_commands', name: 'Voice Commands', type: 'Input', val: 8, startTime: 20, description: 'Allows for code navigation and editing via speech.' },
        { id: 'syntax_tree', name: 'Abstract Syntax Tree', type: 'DataModel', val: 7, startTime: 35, description: 'The structural representation of the code, used for navigation.' },
    ],
    links: [
        { source: 'ide_core', target: 'syntax_tree' },
        { source: 'ide_core', target: 'screen_reader' },
        { source: 'ide_core', target: 'haptic_feedback' },
        { source: 'screen_reader', target: 'braille_display' },
        { source: 'voice_commands', target: 'ide_core' },
    ],
};

const formCellData = {
    nodes: [
        { id: 'form_collection', name: 'Form Collection', type: 'Collection', val: 10, startTime: 0, description: 'A group of related forms.' },
        { id: 'user_profile_form', name: 'User Profile Form', type: 'Form', val: 8, startTime: 10, description: 'Form for editing user profile information.' },
        { id: 'contact_form', name: 'Contact Us Form', type: 'Form', val: 8, startTime: 15, description: 'A public form for sending messages.' },
        { id: 'name_cell', name: 'Name Cell', type: 'Cell', val: 5, startTime: 20, description: 'A simple text input for a name.' },
        { id: 'email_cell', name: 'Email Cell', type: 'Cell', val: 5, startTime: 25, description: 'A text input for an email address.' },
        { id: 'address_cell', name: 'Shared Address Cell', type: 'SharedCell', val: 7, startTime: 30, description: 'A complex cell for an address, shared by multiple forms.' },
    ],
    links: [
        { source: 'form_collection', target: 'user_profile_form' },
        { source: 'form_collection', target: 'contact_form' },
        { source: 'user_profile_form', target: 'name_cell' },
        { source: 'user_profile_form', target: 'email_cell' },
        { source: 'user_profile_form', target: 'address_cell' },
        { source: 'contact_form', target: 'email_cell' },
        { source: 'contact_form', target: 'address_cell' },
    ],
};


export const domains: Domain[] = [
  { id: 'software', name: 'Software Engineering', icon: CodeIcon, data: softwareData },
  { id: 'hr', name: 'Human Resources', icon: UserGroupIcon, data: hrData },
  { id: 'plm', name: 'Product Lifecycle', icon: CubeIcon, data: plmData },
  { id: 'asset_management', name: '3D Asset Management', icon: ShapesIcon, data: assetManagementData },
  { id: 'humanoid_skeleton', name: 'Humanoid Skeleton', icon: SkeletonIcon, data: humanoidSkeletonData },
  { id: 'knowledge_graph', name: 'Knowledge Representation', icon: HierarchyIcon, data: knowledgeGraphData },
  { id: 'database_modeling', name: 'Database Modeling', icon: DatabaseIcon, data: databaseModelingData },
  { id: 'ecommerce', name: 'E-Commerce & Inventory', icon: CartIcon, data: ecommerceData },
  { id: 'hardware_design', name: 'Hardware & Circuit Design', icon: ChipIcon, data: hardwareDesignData },
  { id: 'grammar', name: 'Language & Grammar', icon: BracketsIcon, data: grammarData },
  { id: 'os_concepts', name: 'Operating System Concepts', icon: FolderIcon, data: osData },
  { id: 'real_estate', name: 'Real Estate & Hospitality', icon: BuildingIcon, data: realEstateData },
  { id: 'accessible_ide', name: 'Accessible IDE', icon: AccessibilityIcon, data: accessibleIdeData },
  { id: 'form_cell', name: 'Form & Cell Architecture', icon: GridIcon, data: formCellData },
];
