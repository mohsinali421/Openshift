# This is for Openshift
<img width="895" height="455" alt="image" src="https://github.com/user-attachments/assets/4a09f9b4-759c-46d9-b725-bbdf55d41b26" />

<img width="583" height="237" alt="image" src="https://github.com/user-attachments/assets/6889ad6f-d610-4f5b-8405-537caa9a8ea1" />

<img width="830" height="407" alt="image" src="https://github.com/user-attachments/assets/e205ac8b-041e-4a7b-9f83-198202ba39e3" />

<img width="767" height="317" alt="image" src="https://github.com/user-attachments/assets/dad96a2c-0d2a-4a13-85bb-90dd12fadd16" />

### Basics of Docker & Kubernetes
- Kubernetes also known as K8
- Container are complete isolated env - mount path, network, process
- Docker containers share same base kernal (linux, ubuntu, debian, fedora)
- Docker for windows require different kernal.
- Docker - less memory, less bott up time, less isolation
- Docker Public Registry - Docker hub (nodejs, mongodb, etc)
- Image - is a package, used to create one or more container
- Container - running isolated process

# Virtual Machines vs Docker
<img width="665" height="411" alt="image" src="https://github.com/user-attachments/assets/215b9d95-31ad-41a1-aac9-610f136cd3d9" />

### Container Orchestration
- Kubernetes - automatically deploying, scale up, scale down, manage
- Docker Swarm (easy but lacks advanced feature), kubernetes (mostly used), mesos, etc
- Advantage - highly available, load balanced during peak time


- Redhat Console Sandbox - [https://console.redhat.com/openshift/sandbox]

### Installation
- Install Docker Desktop on Windows
- [Local Setup] Openshift Requirement - 9GB Ram, 35GB Storage, 4 CPUs  [CodeReady Containers]
- [Developer Sandbox] - renew every 30days

### [CodeReady Containers]
- Signup for red hat account
- Article - [https://www.redhat.com/sysadmin/install-openshift-local]
- Download - [https://console.redhat.com/openshift/create/local]
- crc setup - does not work

### links
- Labs - [https://developers.redhat.com/learn?source=sso]
- Dev Cluster - [https://console-openshift-console.apps.sandbox-m4.g2pi.p1.openshiftapps.com/add/ns/mohsinali421-dev]
- Youtube Video - [https://www.youtube.com/watch?v=vu5w74xfLcA&t=132s]

### Login Commands
- login to sandbox -> ? -> command line tools
- oc
- Get token from console
- oc login
- oc status
- oc whoami
- oc logout

### Project Commands
- oc project               [displays current project]
- oc projects              [displays all projects]
- oc new-project myproject [create new project]
- oc project myproject     [switch between project]

### Explain documentaion commands
- oc explain
- oc explain pod
- oc explain pod.spec
- oc explain pod.spec.containers

### Pod commands - group of containers
- oc get pods                  [list of all pods]
- oc get pod [podname]         [list specific pod]
- oc create -f pods/pod.yaml   [create a new pod based on yaml file]
- oc rsh <pod>                 [shell inside a pod] 
- exit                         [exit shell]
- wget localhost:8080          [curl inside shell of pod]
- curl localhost:3001

### Delete pod
- oc delete pod/pod-name        [Delete a pod]
- oc delete pod "podName"       [Another way to delete a pod]
- oc get pods --watch           [two terminal is required]

### Pod Lifecycle
- Pending - trying to schedule a pod on a node
- ContainerCreating - openshift identified a node to create a pod and is now starting
- Running - it is now running 
- 1/1 - left side means total running container, right side indicates total containers in a pod
- Terminating - deleting pod

- YAML - yet another markup language (similar to json)

### Deployment config  [managing multiple pods deployemnt]
- oc explain deploymentconfig
- oc version   [version 4, --as-deployment-config for v4, omit for v3]
- oc new-app mohsinali421/docker_hub_image_for_node21:latest --as-deployment-config
- oc status
- oc get pod
- oc get svc     [svc - service]
- oc get dc      [dc - deployment config]
- oc get istag   [istag - image stream tag]

### Delete Deployment resources
- oc delete svc/service-name
- oc delete dc/dc-name
- oc delete istag

### Delete using label selector
- oc describe dc/hello-world
- oc delete all -l app=hello-world
- oc status

### Naming Deployments
- oc new-app mohsinali421/docker_hub_image_for_node21:latest --name demo-app --as-deployment-config
- oc status

### Deploy from git repo
- oc new-app https://gitlab.com/practical-openshift/hello-world.git --as-deployment-config
-- oc logs -f  bc/mohsin-git [build config]

### Replication Controller
- oc get rc

### Rollout-Rollback
- oc get pods --watch   [ 2 terminal required ]
- oc new-app mohsinali421/docker_hub_image_for_node21:latest --name demo-app  --as-deployment-config
- oc rollout latest dc/demo-app
- oc rollback dc/demo-app
- oc rollout history dc/simple-docker-app
- oc rollout describe dc simple-docker-app
- oc rollout undo dc/simple-docker-app

### Services
- oc explain svc
- oc explain svc.spec
- oc create -f pods/pod.yaml 
- oc expose --port 8080 pod/hello-world-pod   [pod inside service]
- oc create -f pods/pod2.yaml 
- oc rsh hello-world-pod-2
- oc status  [ to get ip address of svc]
- wget -qO- 172.30.246.255:8080
- env   [inside a pod]
- wget -qO- $HELLO_WORLD_POD_PORT_8080_TCP_ADDR:$HELLO_WORLD_POD_PORT_8080_TCP_PORT

### get ip
- oc get pods -o wide

### Routes
- oc expose svc/hello-world-pod
- oc status
- curl [http//]

### Route Definition
- oc get routes
- oc get -o yaml route/hello-world-pod

## Config maps from literal [Max 1MB Storage]
- oc create configmap message-map --from-literal "key"="value"
- oc get configmap
- oc get -o yaml cm/mohsin-config

## Config maps from file
- oc create configmap message-map --from-file=MESSAGE.txt

### Config maps from directory
- oc create configmap my-path-config --from-file=./myfilte.txt
- oc get -o yaml configmap/my-path-config

### Secrets
- Opaque Secrets - for credentials, any key-value
- Service Account Token Secret - access internal openshift API's
- Docker Configuration Secret - for docker pulling and pushing images
- Simple Authentication Secret - Basic Auth, SSH Key, TLS Auth
- oc create secret generic my-secret --from-literal MESSAGE=secret
- oc get secret
- oc get -o yaml secret/my-secret - [base 64 encoded value]
- oc create secret generic tbk-interceptor --from-literal=KEY=hellomymohsin123  --dry-run=client -o yaml | oc apply -f -      [Add another secret in existing]
- oc delete secret/my-secret

### Consuming Secrets
- oc new-app mohsinali421/docker_hub_image_for_node21:latest --as-deployment-config
- oc expose svc/hello-world
- oc status
- curl http://hello-world-mohsinali421-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com
- oc set env dc/hello-world --from secret/my-secret
- curl http://hello-world-mohsinali421-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com
- oc get -o yaml dc/hello-world

### Image Streams
- oc get is
- oc get istag
- oc delete is/hello-world
- oc import-image --confirm mohsinali421/docker_hub_image_for_node21:latest
- oc describe istag/hello-world:latest

### Deploye new app using Image Stream
- oc new-app project-name/imagestream

### Image stream tagging
- oc tag [original]  [destination]
- oc tag docker-hub-image-for-node21:latest  docker-hub-image-for-node21:latest

### Image stream for private images
- oc create secret docker-registry my-secret-for-docker \
    --docker-server=$REGISTRY \
    --docker-username=$REGISTRY_USERNAME \
    --docker-password=$REGISTRY_PASSWORD \
    --docker-email=$REGISTRY_EMAIL
- oc secrets link default \
    my-secret-for-docker \
    --for-pull
- oc describe serviceaccount/default
- oc new-app mohsinali421/private/docker_hub_image_for_node21:latest

## Builds
- just like docker build command to build container
- buildConfig contains information about how build should get created
- oc new-app dockerRepo - is same like building image from source code 
- oc new-build https://github.com/mohsinali421/Docker
- oc get -o yaml buildconfig/docker
- oc get build
- oc get pod

### Watch logs for build
- oc logs -f buildconfig/docker  
- oc logs -f bc/docker   => latest build logs
- oc logs -f pod/docker-3-build

### Start/Cancel a build
- oc start-build buildName 
- oc describe is/buildName  - image stream
- oc cancel-build bc/buildName

## Webhooks
- git triggers build automatically, HTTPS endpoint using tokens
- use generic secrets - oc get -o yaml buildconfig/docker

### Build in a directory
- oc new-build gitHubURL --context-dir myDir

### Post commit build hooks
- oc set build-hook bc/customName --post-commit --script="echo It runs successfully"
- oc logs -f bc/customName
-  oc set build-hook bc/customName --post-commit --script="exit 1"   => failed hook
- oc set build-hook bc/customName --post-commit --remove

## S2I Source to Image
- transform application source code into image
- no need to write Dockerfile
- can use existing builder images
- oc new-app gitHubRepo --context-dir s2i/nodejs --as-deployment-config
- oc delete all --all

## Volumes
- Files - configmaps, secrets, hard disks, cloud storage - s3
- Empty Directory Volume - pod removed from node, rollout, etc
- oc set volume dc/hello-world --add \
    --type emptyDir \
    --mount-path /empty-dir
- oc get -o yaml dc/hello-world
- Use of empty volume - data that needs to be cached for temporary files
- ConfigMap volumes - directly use config map as key value
- oc create configmap tbk-interceptor --from-literal MESSAGE="BOSS"
- oc set volume dc/hello-world --add \
    --configmap-name tbk-interceptor \
    --mount-path /cmPath

## Other Volume Integration
- [https://kubernetes.io/docs/concepts/storage/volumes/]
- oc explian persistentvolume.spec



