'use strict';

module.exports = {
    createDtoMapper: config => new DtoMapper(config)
};

function DtoMapper(config) {
    let _this = this;

    _this.toDto = toDto;
    _this.toDtos = toDtos;
    _this.backToBase = backToBase;

    let _map;
    let _reverseMap;

    function ctor() {
        _map = config.map;

        buildReverseMap();
    }

    function toDto(source) {
        let dto = {};

        transferData(source, dto, _map);

        return dto;
    }

    function toDtos(sources) {
        return sources.map(source => toDto(source));
    }

    function backToBase(dto) {
        let base = {};

        transferData(dto, base, _reverseMap);

        return base;
    }

    function transferData(source, dest, map) {
        Object.keys(_map).forEach(sourcePath => {
            let destPath = _map[sourcePath];
            let value = resolvejPath(source, sourcePath);

            resolvejPath(dest, destPath, value);
        });
    }

    function buildReverseMap() {
        _reverseMap = {};

        Object.keys(_map).forEach(key => {
            let value = _map[key];

            _reverseMap[value] = key;
        });
    }

    function resolvejPath(obj, jpath, value) {
        jpath = jpath.split('.');

        if (value) {
            setjPath(obj, jpath, value);
        } else {
            return getjPath(obj, jpath);
        }
    }

    function getjPath(obj, jpath) {
        let nextPath = jpath.shift();

        if (jpath.length == 0) {
            return obj[nextPath];
        } else if (obj[nextPath] == undefined) {
            return undefined;
        } else {
            return getjPath(obj[nextPath], jpath);
        }
    }

    function setjPath(obj, jpath, value) {
        let nextPath = jpath.shift();

        if (jpath.length == 0) {
            obj[nextPath] = value;
        } else {
            if (obj[nextPath] == undefined) {
                obj[nextPath] = {};
            }

            setjPath(obj[nextPath], jpath, value);
        }
    }

    ctor();
}